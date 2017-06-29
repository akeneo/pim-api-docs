/**
 * Compile API Reference and Reference with handlebars
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

gulp.task('reference', ['clean-dist'], function () {
    gulp.src('./content/akeneo-web-api.yaml')
        .pipe(swagger('akeneo-web-api.json'))
        .pipe(jsonTransform(function(data, file) {
            var templateData = data;
            data.resources = {};
            _.forEach(data.paths, function(path, pathUri){
                var escapedPathUri = pathUri.replace(/\//g, '_').replace(/{/g, '_').replace(/}/g, '_');
                _.forEach(path, function(operation,verb){
                    var escapeTag = operation.tags[0].replace(/\s/g, '');
                    if(!data.resources[escapeTag]){
                        data.resources[escapeTag] = {resourceName: operation.tags[0], operations: {}};
                    }
                    data.resources[escapeTag].operations[verb+escapedPathUri] = _.extend(operation, {
                        verb: verb,
                        path: pathUri
                    });
                });
            });
            return gulp.src('src/api-reference/index.handlebars')
                .pipe(gulpHandlebars(templateData, {}))
                .pipe(rename('api-reference-index.html'))
                .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                .pipe(gulp.dest('dist'));
        }));

    gulp.src('./content/akeneo-web-api.yaml')
        .pipe(swagger('akeneo-web-api.json'))
        .pipe(jsonTransform(function(data, file) {
            var templateData = data;
            data.resources = {};
            _.map(data.definitions,function(definition){
                _.forEach(definition.required, function(requiredProperty){
                    definition.properties[requiredProperty].required = true;
                });
                return definition;
            });
            _.forEach(data.paths, function(path, pathUri){
                var escapedPathUri = pathUri.replace(/\//g, '_').replace(/{/g, '_').replace(/}/g, '_');
                _.forEach(path, function(operation,verb){
                    var operationId = verb + escapedPathUri;
                    var escapeTag = operation.tags[0].replace(/\s/g, '');
                    if(!data.resources[escapeTag]){
                        data.resources[escapeTag] = {resourceName: operation.tags[0], operations: {}};
                    }
                    var groupedParameters =_.groupBy(operation.parameters, function(parameter){
                        return parameter.in;
                    });
                    _.map(groupedParameters.body, function(parameter){
                        var readOnlyProperties = [];
                        _.map(parameter.schema.properties, function(property, propertyName){
                            property.default = (property.default === 0) ? '0' :
                                (property.default === null) ? 'null' :
                                    (property.default === true) ? 'true' :
                                        (property.default === false) ? 'false' :
                                            (property.default && _.isEmpty(property.default)) ? '[]' : property.default;
                            property['x-immutable'] = (verb === 'patch') ? property['x-immutable'] : false;
                            if(verb === 'post' && property['x-read-only']){
                                readOnlyProperties.push(propertyName);
                            }
                        });
                        _.forEach(parameter.schema.required, function(requiredProperty){
                            if(verb !== 'patch'){
                                parameter.schema.properties[requiredProperty].required = true;
                            } else {
                                parameter.schema.properties[requiredProperty].patchRequired = true;
                            }
                        });
                        _.forEach(readOnlyProperties, function(propToDelete){
                            delete parameter.schema.properties[propToDelete];
                        });
                        if(parameter.schema && parameter.schema.example){
                            _.forEach(readOnlyProperties, function(propToDelete){
                                delete parameter.schema.example[propToDelete];
                            });
                            var highlightjsExample = parameter.schema['x-examples'] ?
                                highlightJs.highlight('bash', parameter.schema['x-examples']['x-example-1'] + '\n'
                                    + parameter.schema['x-examples']['x-example-2'] + '\n'
                                    + parameter.schema['x-examples']['x-example-3'], true) :
                                highlightJs.highlight('json', JSON.stringify(parameter.schema.example, null, 2), true);
                            parameter.schema.hljsExample = '<pre class="hljs"><code>' + highlightjsExample.value + '</code></pre>';
                        }
                        return parameter;
                    });

                    _.map(operation.responses, function(response, code){
                        var status = code.match(/^2.*$/) ? 'success' : 'error';
                        response[status] = true;
                        response.id = operationId + '_' + code;
                        var example = response.examples || ((response.schema) ? response.schema.example : undefined);
                        if(example){
                            var highlightjsExample = example['x-example-1'] ?
                                highlightJs.highlight('bash', example['x-example-1'] + '\n' + example['x-example-2']+ '\n' + example['x-example-3'], true) :
                                highlightJs.highlight('json', JSON.stringify(example, null, 2), true);
                            response.hljsExample = '<pre class="hljs"><code>' + highlightjsExample.value + '</code></pre>';
                        }
                        return response;
                    });
                    data.resources[escapeTag].operations[operationId] = _.extend(operation, {verb: verb, path: pathUri, groupedParameters:groupedParameters});
                });
            });
            return gulp.src('src/api-reference/reference.handlebars')
                .pipe(gulpHandlebars(templateData, {}))
                .pipe(rename('api-reference.html'))
                .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
                .pipe(gulp.dest('dist'));
        }));
});
