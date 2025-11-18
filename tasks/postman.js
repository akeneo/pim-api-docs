/**
 * Fetch and process Postman collection with OpenAPI examples
 *
 * This script will:
 * - Fetch the Postman collection JSON from remote URL
 * - Fetch the OpenAPI specification JSON
 * - Extract examples from OpenAPI parameters for GET requests
 * - Add these examples as query parameters to matching Postman requests
 */
var gulp = require('gulp');
const https = require('https');
const fs = require('fs');

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
 * Convert OpenAPI path to Postman path array
 * Example: "/api/rest/v1/products-uuid" -> ["api", "rest", "v1", "products-uuid"]
 * @param {string} openApiPath - OpenAPI path string
 * @returns {Array<string>} Path array
 */
function openApiPathToArray(openApiPath) {
    return openApiPath.split('/').filter(segment => segment.length > 0);
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
function extractExamplesFromOpenApi(openApiSpec) {
    const examplesMap = {};

    if (!openApiSpec.paths) {
        return examplesMap;
    }

    // Iterate through all paths
    for (const [path, pathItem] of Object.entries(openApiSpec.paths)) {
        // Only process GET requests
        if (!pathItem.get) {
            continue;
        }

        const getOperation = pathItem.get;

        // Check if this operation has parameters
        if (!getOperation.parameters || !Array.isArray(getOperation.parameters)) {
            continue;
        }

        const pathArray = openApiPathToArray(path);
        const pathKey = pathArray.join('/');

        // Extract parameters with examples
        for (const parameter of getOperation.parameters) {
            // Only process query parameters with examples
            if (parameter.in !== 'query' || !parameter.examples) {
                continue;
            }

            if (!examplesMap[pathKey]) {
                examplesMap[pathKey] = {};
            }

            examplesMap[pathKey][parameter.name] = {
                description: parameter.description || '',
                examples: parameter.examples
            };
        }
    }

    return examplesMap;
}

/**
 * Add examples to a Postman request item recursively
 * @param {Object} item - Postman collection item (folder or request)
 * @param {Object} examplesMap - Map of path -> parameter -> examples
 * @returns {number} Count of requests modified
 */
function addExamplesToPostmanRequest(item, examplesMap) {
    let modifiedCount = 0;

    // If this is a request item
    if (item.request && item.request.method === 'GET') {
        const urlPath = item.request.url.path;

        // Try to find matching examples in the map
        for (const [openApiPath, parameters] of Object.entries(examplesMap)) {
            const openApiPathArray = openApiPath.split('/');

            if (pathsMatch(urlPath, openApiPathArray)) {
                // Initialize query array if it doesn't exist
                if (!item.request.url.query) {
                    item.request.url.query = [];
                }

                // Add examples for each parameter
                for (const [paramName, paramData] of Object.entries(parameters)) {
                    for (const [exampleName, exampleData] of Object.entries(paramData.examples)) {
                        const newValue = exampleData.value;

                        // Check if this exact parameter (key + value) already exists
                        const isDuplicate = item.request.url.query.some(existing =>
                            existing.key === paramName && existing.value === newValue
                        );

                        if (isDuplicate) {
                            console.log(`  Skipped duplicate example "${exampleName}" for parameter "${paramName}" in ${item.name}`);
                            continue;
                        }

                        const queryParam = {
                            disabled: true,
                            description: {
                                content: exampleData.summary || paramData.description,
                                type: "text/plain"
                            },
                            key: paramName,
                            value: newValue
                        };

                        item.request.url.query.push(queryParam);
                        console.log(`  Added example "${exampleName}" for parameter "${paramName}" to ${item.name}`);
                    }
                }

                modifiedCount++;
                break;
            }
        }
    }

    // If this is a folder, recursively process items
    if (item.item && Array.isArray(item.item)) {
        for (let subItem of item.item) {
            modifiedCount += addExamplesToPostmanRequest(subItem, examplesMap);
        }
    }

    return modifiedCount;
}

gulp.task('fetch-postman-collection', async function() {
    try {
        console.log('Fetching Postman collection...');
        const postmanUrl = 'https://storage.googleapis.com/akecld-prd-pim-saas-shared-openapi-spec/postman_collection.json';
        const collection = await fetchJson(postmanUrl);
        console.log('✓ Postman collection fetched');

        console.log('Fetching OpenAPI specification...');
        const openApiUrl = 'https://storage.googleapis.com/akecld-prd-pim-saas-shared-openapi-spec/openapi.json';
        const openApiSpec = await fetchJson(openApiUrl);
        console.log('✓ OpenAPI specification fetched');

        console.log('Extracting examples from OpenAPI...');
        const examplesMap = extractExamplesFromOpenApi(openApiSpec);
        const pathCount = Object.keys(examplesMap).length;
        console.log(`✓ Found examples for ${pathCount} paths`);

        console.log('Adding examples to Postman collection...');
        let modifiedCount = 0;
        if (collection.item && Array.isArray(collection.item)) {
            for (let item of collection.item) {
                modifiedCount += addExamplesToPostmanRequest(item, examplesMap);
            }
        }
        console.log(`✓ Modified ${modifiedCount} GET requests`);

        // Save the modified collection
        const outputPath = 'content/files/postman-results.json';
        fs.writeFileSync(outputPath, JSON.stringify(collection, null, 2));
        console.log(`✓ Postman collection saved to ${outputPath}`);

    } catch (error) {
        throw error;
    }
});