/**
 * Compile API Reference index and Complete Reference with handlebars
 *
 * This script will:
 * - load the api YAML
 * - transform it to JSON
 * - Create HTML from Handlebars
 */
var gulp = require('gulp');
var swagger = require('gulp-swagger');
var jsonTransform = require('gulp-json-transform');
var _ = require('lodash');
var hbs = require('handlebars');
var gulpHandlebars = require('gulp-handlebars-html')(hbs);
var rename = require('gulp-rename');
var highlightJs = require('highlightjs');
var revReplace = require('gulp-rev-replace');

gulp.task('reference', ['clean-dist', 'less'], function() {

    var versions = ['1.7', '2.0'];
    // We construct a reference index file and a complete reference file for each PIM version: 1.7 and 2.0.
    // When we construct the 1.7 files, we filter to not include the 2.0 only endpoints.
    _.forEach(versions, function(version) {
        var htmlReferenceIndexfileName = (version === '1.7') ? 'api-reference-index-17' : 'api-reference-index';
        gulp.src('./content/swagger/akeneo-web-api.yaml')
            .pipe(swagger('akeneo-web-api.json'))
            .pipe(jsonTransform(function(data, file) {
                var templateData = data;
                data.resources = {};
                data.pimVersion = version;
                data.previousVersion = version === '1.7';
                _.forEach(data.paths, function(path, pathUri) {
                    _.forEach(path, function(operation, verb) {
                        // This is where we filter the 2.0 endpoints if we are constructing the 1.7 version of the reference index file
                        if (((version === '1.7') && (operation['x-versions'][0] === 1.7)) || version === '2.0') {
                            var escapeTag = operation.tags[0].replace(/\s/g, '');
                            if (!data.resources[escapeTag]) {
                                data.resources[escapeTag] = { resourceName: operation.tags[0], operations: {} };
                            }
                            data.resources[escapeTag].operations[operation.operationId] = _.extend(operation, {
                                verb: verb,
                                path: pathUri
                            });
                        }
                    });
                });
                return gulp.src('src/api-reference/index.handlebars')
                    .pipe(gulpHandlebars(templateData, {}))
                    .pipe(rename(htmlReferenceIndexfileName + '.html'))
                    .pipe(revReplace({ manifest: gulp.src("./tmp/rev/rev-manifest.json") }))
                    .pipe(gulp.dest('dist'));
            }));

        var htmlReferencefileName = (version === '1.7') ? 'api-reference-17' : 'api-reference';
        gulp.src('./content/swagger/akeneo-web-api.yaml')
            .pipe(swagger('akeneo-web-api.json'))
            .pipe(jsonTransform(function(data, file) {
                var templateData = data;
                data.resources = {};
                data.pimVersion = version;
                _.map(data.definitions, function(definition) {
                    _.forEach(definition.required, function(requiredProperty) {
                        definition.properties[requiredProperty].required = true;
                    });
                    return definition;
                });
                _.forEach(data.paths, function(path, pathUri) {
                    _.forEach(path, function(operation, verb) {
                        // This is where we filter the 2.0 endpoints if we are constructing the 1.7 version of the complete reference file
                        if (((version === '1.7') && (operation['x-versions'][0] === 1.7)) || version === '2.0') {
                            var operationId = operation.operationId;
                            var escapeTag = operation.tags[0].replace(/\s/g, '');
                            if (!data.resources[escapeTag]) {
                                data.resources[escapeTag] = { resourceName: operation.tags[0], operations: {} };
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
                                var example = response.examples || ((response.schema) ? response.schema.example : undefined);
                                if (example) {
                                    var highlightjsExample = example['x-example-1'] ?
                                        highlightJs.highlight('bash', example['x-example-1'] + '\n' + example['x-example-2'] + '\n' + example['x-example-3'], true) :
                                        highlightJs.highlight('json', JSON.stringify(example, null, 2), true);
                                    response.hljsExample = '<pre class="hljs"><code>' + highlightjsExample.value + '</code></pre>';
                                }
                                return response;
                            });
                            data.resources[escapeTag].operations[operationId] = _.extend(operation, { verb: verb, path: pathUri, groupedParameters: groupedParameters });
                        }
                    });
                });
                return gulp.src('src/api-reference/reference.handlebars')
                    .pipe(gulpHandlebars(templateData, {}))
                    .pipe(rename(htmlReferencefileName + '.html'))
                    .pipe(revReplace({ manifest: gulp.src("./tmp/rev/rev-manifest.json") }))
                    .pipe(gulp.dest('dist'));
            }));
    });
});
