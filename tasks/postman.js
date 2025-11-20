const gulp = require('gulp');
const https = require('https');
const fs = require('fs');

const POSTMAN_URL = 'https://storage.googleapis.com/akecld-prd-pim-saas-shared-openapi-spec/postman_collection.json';
const POSTMAN_ENV_URL = 'https://storage.googleapis.com/akecld-prd-pim-saas-shared-openapi-spec/postman_environment_template.json';
const OPENAPI_URL = 'https://storage.googleapis.com/akecld-prd-pim-saas-shared-openapi-spec/openapi.json';
const POSTMAN_FILE = 'content/files/akeneo-postman-collection.json';
const POSTMAN_ENV_FILE = 'content/files/akeneo-postman-environment.json';
const DESCRIPTION_TYPE_TEXT_PLAIN = 'text/plain';
const HTTP_METHOD_GET = 'GET';
const PARAMETER_TYPE_QUERY = 'query';

/**
 * Fetch Postman environment template and save it to the project
 */
gulp.task('fetch-postman-environment', async function () {
    try {
        const postmanEnvironment = await fetchJson(POSTMAN_ENV_URL);
        fs.writeFileSync(POSTMAN_ENV_FILE, JSON.stringify(postmanEnvironment, null, 2));
    } catch (error) {
        console.error('Failed to fetch Postman environment:', error.message);
        throw error;
    }
});

/**
 * Enrich the Postman collection with OpenAPI examples
 *
 * This script will:
 * - Fetch the Postman collection JSON from remote URL
 * - Fetch the OpenAPI specification JSON from remote URL
 * - Extract examples from OpenAPI parameters for GET requests
 * - Add these examples as query parameters to matching Postman requests
 *
 * @example Postman collection structure (item):
 * {
 *   name: "Product [uuid]",
 *   item: [{
 *     name: "Get list of products",
 *     request: {
 *       method: "GET",
 *       url: {
 *         path: ["api", "rest", "v1", "products-uuid"],
 *         query: [{ key: "limit", value: "10", disabled: false }]
 *       }
 *     }
 *   }]
 * }
 *
 * @example OpenAPI parameter with examples:
 * {
 *   name: "search",
 *   in: "query",
 *   description: "Filter products by criteria",
 *   examples: {
 *     getProductsByCategory: {
 *       summary: "Filter by category",
 *       value: '{"categories":[{"operator":"IN","value":["winter"]}]}'
 *     }
 *   }
 * }
 */
gulp.task('fetch-postman-collection', async function () {
    try {
        const postmanCollection = await fetchJson(POSTMAN_URL);
        const openApiSpec = await fetchJson(OPENAPI_URL);
        const queryExamples = extractQueryExamplesFromOpenApi(openApiSpec);

        if (postmanCollection.item && Array.isArray(postmanCollection.item)) {
            for (let item of postmanCollection.item) {
                addQueryExamplesToPostmanCollection(item, queryExamples);
                cleanMarkdownInCollection(item);
            }
        }

        fs.writeFileSync(POSTMAN_FILE, JSON.stringify(postmanCollection, null, 2));
    } catch (error) {
        console.error('Failed to generate Postman collection:', error.message);
        throw error;
    }
});

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
            if (parameter.in !== PARAMETER_TYPE_QUERY || !parameter.examples) {
                continue;
            }

            if (!queryExamples[path]) {
                queryExamples[path] = {};
            }

            queryExamples[path][parameter.name] = {
                description: cleanMarkdown(parameter.description || ''),
                type: DESCRIPTION_TYPE_TEXT_PLAIN,  // Postman description type
                examples: parameter.examples
            };
        }
    }

    return queryExamples;
}

/**
 * Add examples to a Postman collection request item recursively
 * @param {Object} item - Postman collection item (folder or request)
 * @param {Object} queryExamples - Map of path -> parameter -> examples
 */
function addQueryExamplesToPostmanCollection(item, queryExamples) {
    if (item.request && item.request.method === HTTP_METHOD_GET) {
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
                addParameterExamples(item.request.url.query, paramName, paramData);
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
 * Add parameter examples to query parameters array
 * @param {Array} queryParameters - Array of existing query parameters
 * @param {string} paramName - Parameter name
 * @param {Object} paramData - Parameter data with description, type and examples
 */
function addParameterExamples(queryParameters, paramName, paramData) {
    // Skip if description type is not text/plain
    if (paramData.type !== DESCRIPTION_TYPE_TEXT_PLAIN) {
        return;
    }

    for (const [_exampleName, exampleData] of Object.entries(paramData.examples)) {
        const newValue = exampleData.value;

        // Skip if this parameter already exists
        const isDuplicate = queryParameters.some(existing =>
            existing.key === paramName && existing.value === newValue
        );
        if (isDuplicate) {
            continue;
        }

        const queryParam = {
            disabled: true,
            description: {
                content: cleanMarkdown(exampleData.summary || paramData.description),
                type: paramData.type
            },
            key: paramName,
            value: newValue
        };

        queryParameters.push(queryParam);
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

    queryParameters.sort((a, b) => a.key.localeCompare(b.key));
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
 * Clean all markdown descriptions in a Postman collection item recursively
 * @param {Object} item - Postman collection item (folder or request)
 */
function cleanMarkdownInCollection(item) {
    // Clean request description
    if (item.request && item.request.description) {
        if (typeof item.request.description === 'string') {
            item.request.description = cleanMarkdown(item.request.description);
        } else if (item.request.description.content) {
            item.request.description.content = cleanMarkdown(item.request.description.content);
        }
    }

    // Clean query parameter descriptions in requests
    if (item.request && item.request.url && item.request.url.query) {
        for (let param of item.request.url.query) {
            if (param.description && param.description.content) {
                param.description.content = cleanMarkdown(param.description.content);
            }
        }
    }

    // If this is a folder, recursively process items
    if (item.item && Array.isArray(item.item)) {
        for (let subItem of item.item) {
            cleanMarkdownInCollection(subItem);
        }
    }
}

/**
 * Clean markdown formatting from text for Postman compatibility
 * Postman doesn't handle markdown, so we convert it to plain text
 * @param {string} text - Text potentially containing markdown
 * @returns {string} Clean text without markdown
 */
function cleanMarkdown(text) {
    if (!text) {
        return '';
    }

    // Replace markdown links [text](url) with just the URL
    // Example: "See [Pagination](https://api.akeneo.com/documentation/pagination.html) section"
    // becomes: "See https://api.akeneo.com/documentation/pagination.html section"
    text = text.replace(/\[.+?]\((.+?)\)/g, '$1');

    // Remove bold formatting **text** or __text__
    text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
    text = text.replace(/__([^_]+)__/g, '$1');

    // Remove italic formatting *text* or _text_
    text = text.replace(/\*([^*]+)\*/g, '$1');
    text = text.replace(/_([^_]+)_/g, '$1');

    // Remove inline code formatting `code`
    text = text.replace(/`([^`]+)`/g, '$1');

    return text;
}
