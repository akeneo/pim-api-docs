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
        case 'Published product':
            return 'Published products';
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
        case 'PAM asset category':
        case 'PAM asset tag':
        case 'PAM asset':
        case 'PAM asset reference file':
        case 'PAM asset variation file':
            return 'PAM';
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
            console.log('Successfully downloaded remote events documentation');
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

gulp.task('reference-saas', ['clean-dist', 'less', 'fetch-remote-openapi'], function() {

    gulp.src('content/openapi/openapi.json')
      .pipe(jsonTransform(function(data) {
          // const new_paths = {};
          // for (path of Object.keys(data.paths)) {
          //     if (path === '/api/rest/v1/products-uuid') {
          //         console.log(`keeping ${path}`);
          //         new_paths[path] = data.paths[path];
          //     }
          //     else {
          //         console.log(`Skipping ${path}`);
          //     }
          // }
          // data.paths = new_paths;
          data.tags = undefined;
          return data;
      }))
      .pipe(jsonTransform(function(data) {
          var templateData = data;
          data.htmlReferencefileName = 'api-reference-saas'
          data.categories = {};
          _.forEach(data.paths, function(path, pathUri) {
              _.forEach(path, function(operation, verb) {
                  var escapeTag = operation.tags[0].replace(/[^\w]/g, '');
                  var category = determineCategory(operation.tags[0]);
                  escapeCategory = category.replace(/[^\w]/g, '');
                  if (!data.categories[escapeCategory]){
                      data.categories[escapeCategory] = { categoryName: category, resources: {}};
                      if(escapeCategory === 'PAM') {
                          data.categories[escapeCategory].categoryDeprecated = true;
                      }
                  }
                  if (!data.categories[escapeCategory].resources[escapeTag]) {
                      data.categories[escapeCategory].resources[escapeTag] = { resourceName: operation.tags[0], operations: {}};
                  }
                  if(category.includes('Catalogs for Apps')) {
                      data.categories[escapeCategory].isAppCategory = true;
                  }
                  if(category.includes('Published products')) {
                      data.categories[escapeCategory].isPublishedProduct = true;
                  }
                  if(escapeTag.includes('Productidentifier') || escapeTag.includes('Productuuid')) {
                      data.categories[escapeCategory].resources[escapeTag].isProductIdentifierOrUUID = true;
                  }
                  data.categories[escapeCategory].resources[escapeTag].operations[operation.operationId] = _.extend(operation, {
                      verb: verb,
                      path: pathUri
                  });
              });
          });
          return gulp.src('src/api-reference-saas/index.handlebars')
            .pipe(gulpHandlebars(templateData, {}))
            .pipe(rename('api-reference-saas-index.html'))
            .pipe(revReplace({ manifest: gulp.src("./tmp/rev/rev-manifest.json") }))
            .pipe(gulp.dest('dist'));
      }))





    gulp.src('content/openapi/openapi.json')
      .pipe(gulp.dest('content/swagger'))
      .pipe(jsonTransform(function(data) {
          // translate markdown to html in each parameter description
          _.map(data.paths, function(path) {
              _.map(path, function(operation) {
                  if (operation.description) {
                      operation.description = md.render(operation.description);
                      if (operation.description.startsWith('<p>') && operation.description.endsWith('</p>\n')) {
                          operation.description = operation.description.substring(3, operation.description.length - 5);
                      }
                  }
                  _.map(operation.parameters, function(parameter) {
                      if (parameter.description) {
                          parameter.description = md.render(parameter.description);
                          if (parameter.description.startsWith('<p>') && parameter.description.endsWith('</p>\n')) {
                              parameter.description = parameter.description.substring(3, parameter.description.length - 5);
                          }
                      }
                      if(parameter.schema && parameter.schema.description) {
                          parameter.schema.description = md.render(parameter.schema.description);
                          if (parameter.schema.description.startsWith('<p>') && parameter.schema.description.endsWith('</p>\n')) {
                              parameter.schema.description = parameter.schema.description.substring(3, parameter.schema.description.length - 5);
                          }
                      }
                      return parameter;
                  });
                  _.map(operation.responses, function(response) {
                      if (response.description) {
                          response.description = md.render(response.description);
                      }
                      return response;
                  });
                  return operation;
              });
              return path;
          });
          return data;
      }))
      .pipe(jsonTransform(async function(data) {
          var templateData = data;
          data.categories = {};
          // _.map(data.definitions, function(definition) {
          //     _.forEach(definition.required, function(requiredProperty) {
          //         definition.properties[requiredProperty].required = true;
          //     });
          //     return definition;
          // });
          _.forEach(data.paths, function(path, pathUri) {
              _.forEach(path, function(operation, verb) {
                  var operationId = operation.operationId;
                  var escapeTag = operation.tags[0].replace(/[^\w]/g, '');
                  var category = determineCategory(operation.tags[0]);
                  escapeCategory = category.replace(/[^\w]/g, '');
                  if (!data.categories[escapeCategory]){
                      data.categories[escapeCategory] = { categoryName: category, resources: {}};
                      if(escapeCategory === 'PAM') {
                          data.categories[escapeCategory].categoryDeprecated = true;
                      }
                  }
                  if (!data.categories[escapeCategory].resources[escapeTag]) {
                      data.categories[escapeCategory].resources[escapeTag] = { resourceName: operation.tags[0], operations: {}};
                  }
                  if(category.includes('Catalogs for Apps')) {
                      data.categories[escapeCategory].isAppCategory = true;
                  }
                  if(category.includes('Published products')) {
                      data.categories[escapeCategory].isPublishedProduct = true;
                  }
                  if(escapeTag.includes('Productidentifier') || escapeTag.includes('Productuuid')) {
                      data.categories[escapeCategory].resources[escapeTag].isProductIdentifierOrUUID = true;
                  }
                  var groupedParameters = _.groupBy(operation.parameters, function(parameter) {
                      return parameter.in;
                  });
                  _.map(groupedParameters.body, function(parameter) {
                      var readOnlyProperties = [];
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
                          var highlightjsExample = parameter.schema['x-examples'] ?
                            highlightJs.highlight('bash', parameter.schema['x-examples']['x-example-1'] + '\n' +
                              parameter.schema['x-examples']['x-example-2'] + '\n' +
                              parameter.schema['x-examples']['x-example-3'], true) :
                            highlightJs.highlight('json', JSON.stringify(parameter.schema.example, null, 2), true);
                          parameter.schema.hljsExample = '<pre class="hljs"><code>' + highlightjsExample.value + '</code></pre>';
                      }
                      return parameter;
                  });

                  _.map(operation.responses, function(response, code) {
                      var status = code.match(/^2.*$/) ? 'success' : 'error';
                      response[status] = true;
                      response.id = operationId + '_' + code;

                      const content = response?.content ?? null;
                      if (null !== content) {
                          const contentType = Object.keys(content)[0] ?? null;
                          if (null !== contentType) {
                              let responseExample = content[contentType].example ?? null
                              if (null === responseExample) {
                                  let responseExamples = content[contentType].examples ?? null
                                  if (null !== responseExamples) {
                                      const firstExampleKey = Object.keys(responseExamples)[0] ?? null;
                                      if (null !== firstExampleKey) {
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
                                      const stringValue = highlightJs.highlight('json', JSON.stringify(responseExample, null, 2), true);
                                      response.hljsExample = '<pre class="hljs"><code>' + stringValue.value + '</code></pre>';
                                  }

                                  return response;
                              }
                          }
                      }



                      var example = response.examples || response['x-examples'] || ((response.schema) ? response.schema.example : undefined);
                      if (example) {
                          var highlightjsExample = example['x-example-1'] ?
                            highlightJs.highlight('bash', example['x-example-1'] + '\n' + example['x-example-2'] + '\n' + example['x-example-3'], true) :
                            highlightJs.highlight('json', JSON.stringify(example, null, 2), true);
                          response.hljsExample = '<pre class="hljs"><code>' + highlightjsExample.value + '</code></pre>';
                      }
                      return response;
                  });
                  data.categories[escapeCategory].resources[escapeTag].operations[operationId] = _.extend(operation, { verb: verb, path: pathUri, groupedParameters: groupedParameters});
              });
          });
          return gulp.src('src/api-reference-saas/reference.handlebars')
            .pipe(gulpHandlebars(templateData, {}))
            .pipe(rename('api-reference-saas.html'))
            .pipe(revReplace({ manifest: gulp.src("./tmp/rev/rev-manifest.json") }))
            .pipe(gulp.dest('dist'));
      }));
});
