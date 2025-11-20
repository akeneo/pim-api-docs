/**
 * Compile API Reference index and Complete Reference with handlebars
 *
 * This script will:
 * - load the api YAML
 * - transform it to JSON
 * - Create HTML from Handlebars
 */
var gulp = require('gulp');
var jsonTransform = require('gulp-json-transform');
var _ = require('lodash');
var hbs = require('handlebars');
var gulpHandlebars = require('gulp-handlebars-html')(hbs);
var rename = require('gulp-rename');
var highlightJs = require('highlightjs');
var revReplace = require('gulp-rev-replace');

var MarkdownIt = require('markdown-it');
var md = new MarkdownIt();

// Helper function to render markdown with consistent formatting
function renderMarkdown(text) {
    if (!text) return text;
    let rendered = md.render(text);
    // Remove wrapping <p> tags for inline content
    if (rendered.startsWith('<p>') && rendered.endsWith('</p>\n')) {
        return rendered.substring(3, rendered.length - 5);
    }
    return rendered;
}

// Helper function to format JSON examples with syntax highlighting
function formatJsonExample(example, isBodyByLine = false) {
    if (!example) return null;

    let highlightedExample;
    if (isBodyByLine && typeof example === 'string') {
        highlightedExample = highlightJs.highlight('json', example, true);
    } else {
        const jsonString = typeof example === 'string' ? example : JSON.stringify(example, null, 2);
        highlightedExample = highlightJs.highlight('json', jsonString, true);
    }
    return '<pre class="hljs"><code>' + highlightedExample.value + '</code></pre>';
}

// Helper function to create or update category and resource structure
function setupCategoryAndResource(data, operation, escapeTag, escapeCategory, category) {
    if (!data.categories[escapeCategory]) {
        data.categories[escapeCategory] = { categoryName: category, resources: {} };
        if (escapeCategory === 'PAM') {
            data.categories[escapeCategory].categoryDeprecated = true;
        }
    }

    if (!data.categories[escapeCategory].resources[escapeTag]) {
        data.categories[escapeCategory].resources[escapeTag] = {
            resourceName: operation.tags[0],
            operations: {}
        };
    }

    if (category.includes('Catalogs for Apps')) {
        data.categories[escapeCategory].isAppCategory = true;
    }

    if (escapeTag.includes('Productidentifier') || escapeTag.includes('Productuuid')) {
        data.categories[escapeCategory].resources[escapeTag].isProductIdentifierOrUUID = true;
    }
}

const ignoreVersionImcompatibleProperties = async (data, version) => {
    const { default: objectScan } = await import('object-scan')
    objectScan(['**.x-from-version'], {
        filterFn: ({ value, depth, key, gparent }) => {
            if (`${version}` < value) {
                const propertyName = key[depth - 2];
                try {
                    // If element if array.
                    gparent.splice(propertyName, propertyName);
                } catch (e) {
                    // If element is object.
                    delete gparent[propertyName];
                }
            }
        },
    }) (data)
}

function determineCategory(tag){
    switch(tag){
        case 'Product [identifier]':
        case 'Product [uuid]':
        case 'Product model':
        case 'Product media file':
            return 'Products';
        case 'Family':
        case 'Family variant':
        case 'Attribute':
        case 'Attribute option':
        case 'Attribute group':
        case 'Category':
        case 'Association type':
            return 'Catalog structure';
        case 'Channel':
        case 'Locale':
        case 'Currency':
        case 'Measure family':
        case 'Measurement family':
            return 'Target market settings';
        case 'Asset':
        case 'Asset attribute':
        case 'Asset family':
        case 'Asset attribute option':
        case 'Asset media file':
            return 'Asset Manager';
        case 'Reference entity record':
        case 'Reference entity':
        case 'Reference entity media file':
        case 'Reference entity attribute':
        case 'Reference entity attribute option':
            return 'Reference entities';
        case 'Catalogs':
        case 'Catalog products':
            return 'Catalogs for Apps';
        case 'Mapping schema for products':
            return 'Catalogs for Apps';
        case 'UI Extensions':
            return 'Extensions';
        case 'Jobs':
            return 'Jobs';
        case 'Workflows':
        case 'Workflow executions':
        case 'Workflow tasks':
            return 'Workflows';
        default:
            return 'Utilities';
    }
}

gulp.task('fetch-remote-openapi', function(done) {
    const https = require('https');
    const fs = require('fs');
    const url = 'https://storage.googleapis.com/akecld-prd-pim-saas-shared-openapi-spec/openapi.json';
    const filePath = 'content/openapi/openapi.json';

    https.get(url, (response) => {
        if (response.statusCode !== 200) {
            done(new Error(`Failed to fetch remote file: ${response.statusCode}`));
            return;
        }

        const file = fs.createWriteStream(filePath);
        response.pipe(file);

        file.on('finish', () => {
            file.close();
            done();
        });

        file.on('error', (err) => {
            fs.unlink(filePath, () => {});
            done(err);
        });
    }).on('error', (err) => {
        done(err);
    });
});

gulp.task('reference', ['clean-dist', 'less', 'fetch-remote-openapi'], function() {

    gulp.src('content/openapi/openapi.json')
      .pipe(jsonTransform(function(data) {
          data.htmlReferencefileName = 'api-reference'
          data.categories = {};
          _.forEach(data.paths, function(path, pathUri) {
              _.forEach(path, function(operation, verb) {
                  // Check if tags exist and have at least one element
                  if (!operation.tags || !operation.tags[0]) {
                      console.warn('Warning: Operation missing tags for path', pathUri, verb);
                      return; // Skip this operation
                  }
                  var escapeTag = operation.tags[0].replace(/[^\w]/g, '');
                  var category = determineCategory(operation.tags[0]);
                  var escapeCategory = category.replace(/[^\w]/g, '');

                  setupCategoryAndResource(data, operation, escapeTag, escapeCategory, category);

                  data.categories[escapeCategory].resources[escapeTag].operations[operation.operationId] = _.extend(operation, {
                      verb: verb,
                      path: pathUri
                  });
              });
          });

          return gulp.src('src/api-reference/index.handlebars')
            .pipe(gulpHandlebars(data, {
                partialsDirectory: ['./src/partials']
            }))
            .pipe(rename('api-reference-index.html'))
            .pipe(revReplace({ manifest: gulp.src("./tmp/rev/rev-manifest.json") }))
            .pipe(gulp.dest('dist'));
      }))

    gulp.src('content/openapi/openapi.json')
      .pipe(gulp.dest('content/swagger'))
      .pipe(jsonTransform(function(data) {

          // use x-body-by-line-schema when available
          for (let path in data.paths) {
              for (let operation in data.paths[path]) {
                  if (data.paths[path][operation].requestBody) {
                      for (let content in (data.paths[path][operation].requestBody.content ?? {})) {
                          if (data.paths[path][operation].requestBody.content[content]['x-body-by-line-schema']) {
                              data.paths[path][operation].requestBody.content[content].schema = data.paths[path][operation].requestBody.content[content]['x-body-by-line-schema'];
                          }
                      }
                  }

                  for (let response in (data.paths[path][operation].responses ?? {})) {
                      for (let content in (data.paths[path][operation].responses[response].content ?? {})) {
                          if (data.paths[path][operation].responses[response].content[content]['x-body-by-line-schema']) {
                              data.paths[path][operation].responses[response].content[content].schema = data.paths[path][operation].responses[response].content[content]['x-body-by-line-schema'];
                          }
                      }
                  }
              }
          }

          // translate markdown to html in each parameter description
          _.map(data.paths, function(path) {
              _.map(path, function(operation) {
                  if (operation.description) {
                      operation.description = renderMarkdown(operation.description);
                  }
                  _.map(operation.parameters, function(parameter) {
                      if (parameter.description) {
                          parameter.description = renderMarkdown(parameter.description);
                      }
                      if(parameter.schema && parameter.schema.description) {
                          parameter.schema.description = renderMarkdown(parameter.schema.description);
                      }
                      return parameter;
                  });

                  function renderDescriptions(schema) {
                      if (!schema) return;
                      if (schema.description) {
                          schema.description = renderMarkdown(schema.description);
                      }
                      // Always recurse into 'properties' if present
                      if (schema.properties) {
                          _.forEach(schema.properties, renderDescriptions);
                      }
                      // Recurse into 'patternProperties' if present (for dynamic properties)
                      if (schema.patternProperties) {
                          _.forEach(schema.patternProperties, renderDescriptions);
                      }
                      // Recurse into 'additionalProperties' if present (for dynamic properties)
                      if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
                          renderDescriptions(schema.additionalProperties);
                      }
                      // Always recurse into 'items' if present (for arrays)
                      if (schema.items) {
                          renderDescriptions(schema.items);
                      }
                      // Recurse into 'allOf', 'anyOf', 'oneOf' if present (for composed schemas)
                      ['allOf', 'anyOf', 'oneOf'].forEach(key => {
                          if (Array.isArray(schema[key])) {
                              schema[key].forEach(renderDescriptions);
                          }
                      });
                      // Recurse into nested 'schema' if present
                      if (schema.schema) {
                          renderDescriptions(schema.schema);
                      }
                  }

                  // For requestBody
                  _.map(operation?.requestBody?.content ?? {}, function(content) {
                      if (content.schema) {
                          renderDescriptions(content.schema);
                      }
                      return content;
                  });

                  // For responses
                  _.map(operation.responses, function(response) {
                      if (response.description) {
                          response.description = renderMarkdown(response.description);
                      }
                      for (let content in response.content) {
                          if (response.content[content].schema) {
                              renderDescriptions(response.content[content].schema);
                          }
                      }
                      return response;
                  });

                  return operation;
              });
              return path;
          });

          // Remove empty requestBody
          for (let path in data.paths) {
              for (let operation in data.paths[path]) {
                  if (data.paths[path][operation].requestBody) {
                      const requestBody = data.paths[path][operation].requestBody;
                      // Check if requestBody has no content or empty content
                      if (!requestBody.content || Object.keys(requestBody.content).length === 0) {
                          delete data.paths[path][operation].requestBody;
                      } else {
                          // Check if all content types have empty or meaningless schemas
                          let hasNonEmptyContent = false;
                          for (let contentType in requestBody.content) {
                              const content = requestBody.content[contentType];
                              if (content.schema) {
                                  // Check if schema is truly non-empty
                                  // A schema with just type: object and no properties is considered empty
                                  const schema = content.schema;
                                  const isEmptyObjectSchema =
                                      schema.type === 'object' &&
                                      (!schema.properties || Object.keys(schema.properties).length === 0) &&
                                      !schema.additionalProperties &&
                                      !schema.allOf &&
                                      !schema.oneOf &&
                                      !schema.anyOf;

                                  // Check if example is also empty
                                  const hasEmptyExample =
                                      content.example !== undefined &&
                                      (content.example === null ||
                                       (typeof content.example === 'object' && Object.keys(content.example).length === 0));

                                  // If schema is not an empty object schema, or has meaningful content
                                  if (!isEmptyObjectSchema || (!hasEmptyExample && content.example !== undefined)) {
                                      hasNonEmptyContent = true;
                                      break;
                                  }
                              }
                          }
                          if (!hasNonEmptyContent) {
                              delete data.paths[path][operation].requestBody;
                          }
                      }
                  }
              }
          }

          // Transform patternProperties into displayable format
          function transformPatternProperties(schema, parentKey = null, isCategoryEndpoint = false) {
              if (!schema) return;

              // First, recursively process all nested schemas
              if (schema.properties) {
                  Object.entries(schema.properties).forEach(([key, prop]) => {
                      // Skip transforming patternProperties for 'values' property (except for category endpoints)
                      transformPatternProperties(prop, key, isCategoryEndpoint);
                  });
              }
              if (schema.items) {
                  transformPatternProperties(schema.items, parentKey, isCategoryEndpoint);
              }
              if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
                  transformPatternProperties(schema.additionalProperties, parentKey, isCategoryEndpoint);
              }
              ['allOf', 'anyOf', 'oneOf'].forEach(key => {
                  if (Array.isArray(schema[key])) {
                      schema[key].forEach(s => transformPatternProperties(s, parentKey, isCategoryEndpoint));
                  }
              });

              // Skip patternProperties transformation for 'values' schemas (except for category endpoints)
              if (parentKey === 'values' && !isCategoryEndpoint) {
                  return;
              }

              // For category endpoints, transform additionalProperties into displayable format (applies to values property)
              if (isCategoryEndpoint && schema.additionalProperties && typeof schema.additionalProperties === 'object') {
                  // If the schema doesn't have properties yet, create an empty object
                  if (!schema.properties) {
                      schema.properties = {};
                  }

                  // Use a pattern-like key to indicate this is a dynamic property
                  const dynamicKey = '{attributeCode|attributeUuid|channel|locale}';

                  // Convert additionalProperties to a property for display
                  schema.properties[dynamicKey] = {
                      ...schema.additionalProperties,
                      description: schema.additionalProperties.description || 'Attribute value object',
                      isAdditionalProperty: true
                  };

                  // Remove additionalProperties after converting to avoid duplication
                  delete schema.additionalProperties;
              }

              // Then, handle patternProperties at this level
              if (schema.patternProperties) {
                  // If the schema doesn't have properties yet, create an empty object
                  if (!schema.properties) {
                      schema.properties = {};
                  }

                  // Convert patternProperties to regular properties for display
                  for (const [pattern, patternSchema] of Object.entries(schema.patternProperties)) {
                      // Use the pattern as the key, wrapped to show it's a pattern
                      const patternKey = `{${pattern}}`;

                      // Merge the pattern schema into properties
                      schema.properties[patternKey] = {
                          ...patternSchema,
                          description: patternSchema.description || '',
                          isPatternProperty: true,
                          pattern: pattern
                      };
                  }

                  // Remove patternProperties after converting them to avoid duplication
                  delete schema.patternProperties;
              }
          }

          // Handle oneOf and anyOf by keeping only the first element
          // Returns true if oneOf or anyOf was found at any level
          function simplifyOneOf(schema) {
              if (!schema) return false;

              let hasOneOfOrAnyOf = false;

              // If schema has oneOf, replace with first element
              if (schema.oneOf && Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
                  hasOneOfOrAnyOf = true;
                  const firstOption = schema.oneOf[0];
                  // Use spread operator to merge properties
                  Object.assign(schema, firstOption);
                  delete schema.oneOf;
              }

              // If schema has anyOf, replace with first element (same treatment as oneOf)
              if (schema.anyOf && Array.isArray(schema.anyOf) && schema.anyOf.length > 0) {
                  hasOneOfOrAnyOf = true;
                  const firstOption = schema.anyOf[0];
                  // Use spread operator to merge properties
                  Object.assign(schema, firstOption);
                  delete schema.anyOf;
              }

              // Recursively process nested schemas
              if (schema.properties) {
                  Object.values(schema.properties).forEach(prop => {
                      if (simplifyOneOf(prop)) hasOneOfOrAnyOf = true;
                  });
              }
              if (schema.patternProperties) {
                  Object.values(schema.patternProperties).forEach(prop => {
                      if (simplifyOneOf(prop)) hasOneOfOrAnyOf = true;
                  });
              }
              if (schema.items) {
                  if (simplifyOneOf(schema.items)) hasOneOfOrAnyOf = true;
              }
              if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
                  if (simplifyOneOf(schema.additionalProperties)) hasOneOfOrAnyOf = true;
              }
              // Process allOf arrays (anyOf is now handled above)
              if (Array.isArray(schema.allOf)) {
                  schema.allOf.forEach(s => {
                      if (simplifyOneOf(s)) hasOneOfOrAnyOf = true;
                  });
              }

              return hasOneOfOrAnyOf;
          }

          // Apply oneOf simplification and patternProperties transformation to all operations
          for (let path in data.paths) {
              for (let operation in data.paths[path]) {
                  // Check if this is a category endpoint
                  const isCategoryEndpoint = data.paths[path][operation].tags &&
                                            data.paths[path][operation].tags[0] === 'Category';

                  // Process request body schemas
                  if (data.paths[path][operation].requestBody) {
                      let requestBodyHasOneOfOrAnyOf = false;
                      for (let contentType in (data.paths[path][operation].requestBody.content ?? {})) {
                          if (data.paths[path][operation].requestBody.content[contentType].schema) {
                              const hasOneOfOrAnyOf = simplifyOneOf(data.paths[path][operation].requestBody.content[contentType].schema);
                              if (hasOneOfOrAnyOf) {
                                  requestBodyHasOneOfOrAnyOf = true;
                              }
                              transformPatternProperties(data.paths[path][operation].requestBody.content[contentType].schema, null, isCategoryEndpoint);
                          }
                      }
                      // Add marker if oneOf/anyOf was found
                      if (requestBodyHasOneOfOrAnyOf) {
                          data.paths[path][operation].requestBody.hasOneOfOrAnyOf = true;
                      }
                  }

                  // Process response schemas
                  for (let response in (data.paths[path][operation].responses ?? {})) {
                      let responseHasOneOfOrAnyOf = false;
                      for (let contentType in (data.paths[path][operation].responses[response].content ?? {})) {
                          if (data.paths[path][operation].responses[response].content[contentType].schema) {
                              const hasOneOfOrAnyOf = simplifyOneOf(data.paths[path][operation].responses[response].content[contentType].schema);
                              if (hasOneOfOrAnyOf) {
                                  responseHasOneOfOrAnyOf = true;
                              }
                              transformPatternProperties(data.paths[path][operation].responses[response].content[contentType].schema, null, isCategoryEndpoint);
                          }
                      }
                      // Add marker if oneOf/anyOf was found
                      if (responseHasOneOfOrAnyOf) {
                          data.paths[path][operation].responses[response].hasOneOfOrAnyOf = true;
                      }
                  }

                  // Process parameters schemas
                  if (data.paths[path][operation].parameters) {
                      data.paths[path][operation].parameters.forEach(param => {
                          if (param.schema) {
                              simplifyOneOf(param.schema);
                              transformPatternProperties(param.schema, null, isCategoryEndpoint);
                          }
                      });
                  }
              }
          }

          return data;
      }))
      .pipe(jsonTransform(function(data) {
          data.categories = {};
          _.forEach(data.paths, function(path, pathUri) {
              _.forEach(path, function(operation, verb) {
                  const operationId = operation.operationId;
                  // Check if tags exist and have at least one element
                  if (!operation.tags || !operation.tags[0]) {
                      console.warn('Warning: Operation missing tags for operationId', operationId, verb);
                      return; // Skip this operation
                  }
                  const escapeTag = operation.tags[0].replace(/\W/g, '');
                  const category = determineCategory(operation.tags[0]);
                  const escapeCategory = category.replace(/\W/g, '');

                  setupCategoryAndResource(data, operation, escapeTag, escapeCategory, category);
                  const groupedParameters = _.groupBy(operation.parameters, parameter => parameter.in);

                  _.map(groupedParameters.body, function(parameter) {
                      const readOnlyProperties = [];
                      _.map(parameter.schema.properties, function(property, propertyName) {
                          property.default = (property.default === 0) ? '0' :
                            (property.default === null) ? 'null' :
                              (property.default === true) ? 'true' :
                                (property.default === false) ? 'false' :
                                  (property.default && _.isEmpty(property.default)) ? '[]' : property.default;
                          property['x-immutable'] = (verb === 'patch') ? property['x-immutable'] : false;
                          if (verb === 'post' && property['x-read-only']) {
                              readOnlyProperties.push(propertyName);
                          }
                      });
                      _.forEach(parameter.schema.required, function(requiredProperty) {
                          if (verb !== 'patch') {
                              parameter.schema.properties[requiredProperty].required = true;
                          } else {
                              parameter.schema.properties[requiredProperty].patchRequired = true;
                          }
                      });
                      if(parameter.schema.items){
                          _.map(parameter.schema.items.properties, function(property, propertyName) {
                              property.default = (property.default === 0) ? '0' :
                                (property.default === null) ? 'null' :
                                  (property.default === true) ? 'true' :
                                    (property.default === false) ? 'false' :
                                      (property.default && _.isEmpty(property.default)) ? '[]' : property.default;
                              property['x-immutable'] = (verb === 'patch') ? property['x-immutable'] : false;
                              if (verb === 'post' && property['x-read-only']) {
                                  readOnlyProperties.push(propertyName);
                              }
                          });
                          _.forEach(parameter.schema.items.required, function(requiredProperty) {
                              if (verb !== 'patch') {
                                  parameter.schema.items.properties[requiredProperty].required = true;
                              } else {
                                  parameter.schema.items.properties[requiredProperty].patchRequired = true;
                              }
                          });
                      }
                      _.forEach(readOnlyProperties, function(propToDelete) {
                          delete parameter.schema.properties[propToDelete];
                      });
                      if (parameter.schema && parameter.schema.example) {
                          _.forEach(readOnlyProperties, function(propToDelete) {
                              delete parameter.schema.example[propToDelete];
                          });
                          parameter.schema.hljsExample = formatJsonExample(parameter.schema.examples);
                      }
                      return parameter;
                  });

                  // Process requestBody schema properties (same as body parameters)
                  if (operation.requestBody && operation.requestBody.content) {
                      for (let content in operation.requestBody.content) {
                          const contentObj = operation.requestBody.content[content];
                          // Process schema properties if schema exists
                          if (contentObj.schema) {
                              const readOnlyProperties = [];
                              // Process main properties
                              if (contentObj.schema.properties) {
                                  _.map(contentObj.schema.properties, function(property, propertyName) {
                                      property.default = (property.default === 0) ? '0' :
                                          (property.default === null) ? 'null' :
                                              (property.default === true) ? 'true' :
                                                  (property.default === false) ? 'false' :
                                                      (property.default && _.isEmpty(property.default)) ? '[]' : property.default;
                                      property['x-immutable'] = (verb === 'patch') ? property['x-immutable'] : false;
                                      if (verb === 'post' && property['x-read-only']) {
                                          readOnlyProperties.push(propertyName);
                                      }
                                  });
                                  _.forEach(contentObj.schema.required, function(requiredProperty) {
                                      if (contentObj.schema.properties && contentObj.schema.properties[requiredProperty]) {
                                          if (verb !== 'patch') {
                                              contentObj.schema.properties[requiredProperty].required = true;
                                          } else {
                                              contentObj.schema.properties[requiredProperty].patchRequired = true;
                                          }
                                      }
                                  });
                              }
                              // Process items properties if schema.items exists
                              if (contentObj.schema.items && contentObj.schema.items.properties) {
                                  _.map(contentObj.schema.items.properties, function(property, propertyName) {
                                      property.default = (property.default === 0) ? '0' :
                                          (property.default === null) ? 'null' :
                                              (property.default === true) ? 'true' :
                                                  (property.default === false) ? 'false' :
                                                      (property.default && _.isEmpty(property.default)) ? '[]' : property.default;
                                      property['x-immutable'] = (verb === 'patch') ? property['x-immutable'] : false;
                                      if (verb === 'post' && property['x-read-only']) {
                                          readOnlyProperties.push(propertyName);
                                      }
                                  });
                                  _.forEach(contentObj.schema.items.required, function(requiredProperty) {
                                      if (contentObj.schema.items.properties && contentObj.schema.items.properties[requiredProperty]) {
                                          if (verb !== 'patch') {
                                              contentObj.schema.items.properties[requiredProperty].required = true;
                                          } else {
                                              contentObj.schema.items.properties[requiredProperty].patchRequired = true;
                                          }
                                      }
                                  });
                              }

                              // Remove read-only properties from schema
                              if (contentObj.schema.properties) {
                                  _.forEach(readOnlyProperties, function(propToDelete) {
                                      delete contentObj.schema.properties[propToDelete];
                                  });
                              }
                              // Remove read-only properties from example
                              if (contentObj.schema && contentObj.schema.example) {
                                  _.forEach(readOnlyProperties, function(propToDelete) {
                                      delete contentObj.schema.example[propToDelete];
                                  });
                              }
                          }
                          // Get example from request body schema or request body examples
                          if (contentObj.example) {
                              operation.requestBody.hljsExample = formatJsonExample(
                                  contentObj.example,
                                  operation['x-body-by-line']
                              );
                              break;
                          } else if (contentObj.examples) {
                              const examplesKeys = Object.keys(contentObj.examples);
                              if (examplesKeys.length > 0) {
                                  const firstKey = examplesKeys[0];
                                  operation.requestBody.hljsExample = formatJsonExample(
                                      contentObj.examples[firstKey]?.value
                                  );
                                  break;
                              }
                          }
                      }
                  }

                  // Get example from response schema or response examples
                  _.map(operation.responses, function(response, code) {
                      const status = code.match(/^2.*$/) ? 'success' : 'error';
                      response[status] = true;
                      response.id = operationId + '_' + code;

                      const content = response?.content ?? null;
                      if (null !== content) {
                          const contentKeys = Object.keys(content);
                          if (contentKeys.length > 0) {
                              const contentType = contentKeys[0];
                              let responseExample = content[contentType].example ?? null
                              if (null === responseExample) {
                                  let responseExamples = content[contentType].examples ?? null
                                  if (null !== responseExamples) {
                                      const exampleKeys = Object.keys(responseExamples);
                                      if (exampleKeys.length > 0) {
                                          const firstExampleKey = exampleKeys[0];
                                          responseExample = responseExamples[firstExampleKey]?.value ?? null;
                                      }
                                  }
                              }
                              if (null !== responseExample) {
                                  if ('application/vnd.akeneo.collection+json' === contentType && typeof responseExample === 'string') {
                                      const responseExampleLines = responseExample.split('\n');
                                      for (let i = 0; i < responseExampleLines.length; i++) {
                                          responseExampleLines[i] = highlightJs.highlight('json', responseExampleLines[i], true).value;
                                      }
                                      response.hljsExample = '<pre class="hljs"><code>' + responseExampleLines.join("\n") + '</code></pre>';
                                  } else {
                                      response.hljsExample = formatJsonExample(responseExample);
                                  }

                                  return response;
                              }
                          }
                      }

                      // Fallback to example in schema
                      const example = response.examples || ((response.schema) ? response.schema.example : undefined);
                      if (example) {
                          response.hljsExample = formatJsonExample(example);
                      }
                      return response;
                  });
                  data.categories[escapeCategory].resources[escapeTag].operations[operationId] = _.extend(operation, { verb: verb, path: pathUri, groupedParameters: groupedParameters});
              });
          });
          return gulp.src('src/api-reference/reference.handlebars')
            .pipe(gulpHandlebars(data, {
                partialsDirectory: ['./src/partials']
            }))
            .pipe(rename('api-reference.html'))
            .pipe(revReplace({ manifest: gulp.src("./tmp/rev/rev-manifest.json") }))
            .pipe(gulp.dest('dist'));
      }));
});
