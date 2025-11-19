/**
 * Enrich the Postman collection with OpenAPI examples
 *
 * This script will:
 * - Fetch the Postman collection JSON from remote URL
 * - Fetch the OpenAPI specification JSON from remote URL
 * - Extract examples from OpenAPI parameters for GET requests
 * - Add these examples as query parameters to matching Postman requests
 */
const gulp = require('gulp');
const https = require('https');
const fs = require('fs');

const POSTMAN_URL = 'https://storage.googleapis.com/akecld-prd-pim-saas-shared-openapi-spec/postman_collection.json';
const OPENAPI_URL = 'https://storage.googleapis.com/akecld-prd-pim-saas-shared-openapi-spec/openapi.json';
const POSTMAN_FILE = 'content/files/akeneo-postman-collection.json';
gulp.task('fetch-postman-collection', async function () {
    try {
        const postmanCollection = await fetchJson(POSTMAN_URL);
        const openApiSpec = await fetchJson(OPENAPI_URL);


        const queryExamples = extractQueryExamplesFromOpenApi(openApiSpec);

        if (postmanCollection.item && Array.isArray(postmanCollection.item)) {
            for (let item of postmanCollection.item) {
                addQueryExamplesToPostmanCollection(item, queryExamples);
            }
        }

        fs.writeFileSync(POSTMAN_FILE, JSON.stringify(postmanCollection, null, 2));

    } catch (error) {
        throw error;
    }
});

/**
 * Add examples to a Postman collection request item recursively
 * @param {Object} item - Postman collection item (folder or request)
 * @example
 * item structure:
 * {
 *   name: "Get list of products",
 *   request: {
 *     url: {
 *       path: [
 *          "api",
 *          "rest",
 *          "v1",
 *          "products-uuid"
 *       ],
 *       query: [
 *         { key: "limit", value: "10", disabled: false }
 *       ]
 *     },
 *     method: "GET"
 *   }
 * }
 *
 * @param {Object} queryExamples - Map of path -> parameter -> examples
 * @example
 * queryExamples structure:
 * {
 *   "api/rest/v1/products-uuid": {
 *     "search": {
 *       description: "Filter products by criteria",
 *       examples: {
 *         "getProductsByCategory": {
 *           summary: "Filter by category",
 *           value: '{"categories":[{"operator":"IN","value":["winter"]}]}'
 *         }
 *       }
 *     }
 *   }
 * }
 */
function addQueryExamplesToPostmanCollection(item, queryExamples) {
    if (item.request && item.request.method === 'GET') {
        const urlPath = item.request.url.path;

        for (const [openApiPath, parameters] of Object.entries(queryExamples)) {
            const openApiPathArray = openApiPath.split('/').filter(segment => segment.length > 0);

            if (!pathsMatch(urlPath, openApiPathArray)) {
                continue;
            }

            if (!item.request.url.query) {
                item.request.url.query = [];
            }

            for (const [paramName, paramData] of Object.entries(parameters)) {
                // Skip if description type is not text/plain
                if (paramData.type !== "text/plain") {
                    continue;
                }

                for (const [exampleName, exampleData] of Object.entries(paramData.examples)) {
                    const newValue = exampleData.value;

                    const isDuplicate = item.request.url.query.some(existing => existing.key === paramName && existing.value === newValue);
                    if (isDuplicate) {
                        continue;
                    }

                    const queryParam = {
                        disabled: true,
                        description: {
                            content: exampleData.summary || paramData.description,
                            type: paramData.type
                        },
                        key: paramName,
                        value: newValue
                    };

                    item.request.url.query.push(queryParam);
                }
            }

            sortQueryParametersByKey(item.request.url.query);
            break;
        }
    }

    // If this is a folder, recursively process items
    if (item.item && Array.isArray(item.item)) {
        for (let subItem of item.item) {
            addQueryExamplesToPostmanCollection(subItem, queryExamples);
        }
    }
}


/**
 * Sort query parameters by key to group same parameters together
 * @param {Array} queryParameters - Array of query parameters to sort in place
 */
function sortQueryParametersByKey(queryParameters) {
    if (!queryParameters || queryParameters.length === 0) {
        return;
    }

    queryParameters.sort((a, b) => {
        if (a.key < b.key) return -1;
        if (a.key > b.key) return 1;
        return 0;
    });
}

/**
 * Fetch JSON from a URL
 * @param {string} url - URL to fetch
 * @returns {Promise<Object>} Parsed JSON object
 */
function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to fetch ${url}: ${response.statusCode}`));
                return;
            }

            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

/**
 * Check if Postman path matches OpenAPI path
 * @param {Array|String} postmanPath - Postman URL path
 * @param {Array} openApiPath - OpenAPI path as array
 * @returns {boolean} True if paths match
 */
function pathsMatch(postmanPath, openApiPath) {
    const pathArray = Array.isArray(postmanPath) ? postmanPath : [postmanPath];

    if (pathArray.length !== openApiPath.length) {
        return false;
    }

    for (let i = 0; i < pathArray.length; i++) {
        // Handle path parameters: {uuid} in OpenAPI should match any value in Postman
        if (openApiPath[i].startsWith('{') && openApiPath[i].endsWith('}')) {
            continue;
        }
        if (pathArray[i] !== openApiPath[i]) {
            return false;
        }
    }

    return true;
}

/**
 * Extract examples from OpenAPI specification for GET requests
 * @param {Object} openApiSpec - OpenAPI specification object
 * @returns {Object} Map of path -> parameter -> examples
 */
function extractQueryExamplesFromOpenApi(openApiSpec) {
    const queryExamples = {};

    if (!openApiSpec.paths) {
        return queryExamples;
    }

    for (const [path, pathItem] of Object.entries(openApiSpec.paths)) {
        if (!pathItem.get) {
            continue;
        }
        const getOperation = pathItem.get;
        if (!getOperation.parameters || !Array.isArray(getOperation.parameters)) {
            continue;
        }

        for (const parameter of getOperation.parameters) {
            // Only process query parameters with examples
            if (parameter.in !== 'query' || !parameter.examples) {
                continue;
            }

            if (!queryExamples[path]) {
                queryExamples[path] = {};
            }

            queryExamples[path][parameter.name] = {
                description: parameter.description || '',
                type: "text/plain",  // Postman description type
                examples: parameter.examples
            };
        }
    }

    return queryExamples;
}
