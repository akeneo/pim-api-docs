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

function determineCategory(tag){
    switch(tag){
        case 'Products':
        case 'Published products':
        case 'Product models':
            return 'Product entities';
        case 'Families': 
        case 'Categories': 
        case 'Attributes': 
        case 'Attribute options': 
        case 'Attribute groups': 
        case 'Channels': 
        case 'Association types':
            return 'Catalog modeling entities';
        case 'Locales': 
        case 'Currencies':  
        case 'Measure families':
            return 'Global settings entities';
        case 'Asset categories':
        case 'Asset tags':
        case 'Assets':
        case 'Media files':
            return 'Media resource entities';
        default:
            return 'Utilities';
    }
}

gulp.task('reference', ['clean-dist', 'less'], function() {

    var versions = ['1.7', '2.0', '2.1'];
    // We construct a reference index file and a complete reference file for each PIM version: 1.7, 2.0 and 2.1.
    // When we construct the 1.7 files, we filter to not include the new 2.0 and the 2.1 endpoints.
    // Same thing when we construct the 2.0 files, we filter to not include the 2.1 endpoints.
    _.forEach(versions, function(version) {

        var htmlReferenceIndexfileName = (version === '1.7') ? 'api-reference-index-17' : 
                                        (version === '2.0') ? 'api-reference-index-20' : 'api-reference-index';
        var htmlReferencefileName = (version === '1.7') ? 'api-reference-17' :
                                    (version === '2.0') ? 'api-reference-20' : 'api-reference';

        gulp.src('./content/swagger/akeneo-web-api.yaml')
            .pipe(swagger('akeneo-web-api.json'))
            .pipe(jsonTransform(function(data, file) {
                var templateData = data;
                data.categories = {};
                data.pimVersion = version;
                data.htmlReferencefileName = htmlReferencefileName;
                _.forEach(data.paths, function(path, pathUri) {
                    _.forEach(path, function(operation, verb) {
                        // This is where we filter the endpoints depending on their availability in the PIM versions
                        if (((version === '1.7') && (operation['x-versions'][0] === "1.7")) ||
                             (version === '2.0' && (operation['x-versions'][0] === "2.0" || operation['x-versions'][1] === "2.0")) || version === '2.1') {
                            var escapeTag = operation.tags[0].replace(/\s/g, '');
                            var category = determineCategory(operation.tags[0]);
                            escapeCategory = category.replace(/\s/g, '');
                            if (!data.categories[escapeCategory]){
                                data.categories[escapeCategory] = { categoryName: category, resources: {}};
                            }
                            if (!data.categories[escapeCategory].resources[escapeTag]) {
                                data.categories[escapeCategory].resources[escapeTag] = { resourceName: operation.tags[0], operations: {}};
                            }
                            data.categories[escapeCategory].resources[escapeTag].operations[operation.operationId] = _.extend(operation, {
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

        gulp.src('./content/swagger/akeneo-web-api.yaml')
            .pipe(swagger('akeneo-web-api.json'))
            .pipe(jsonTransform(function(data, file) {
                var templateData = data;
                data.categories = {};
                data.pimVersion = version;
                _.map(data.definitions, function(definition) {
                    _.forEach(definition.required, function(requiredProperty) {
                        definition.properties[requiredProperty].required = true;
                    });
                    return definition;
                });
                _.forEach(data.paths, function(path, pathUri) {
                    _.forEach(path, function(operation, verb) {
                        // This is where we filter the endpoints depending on their availability in the PIM versions
                        if (((version === '1.7') && (operation['x-versions'][0] === "1.7")) || 
                             (version === '2.0' && (operation['x-versions'][0] === "2.0" || operation['x-versions'][1] === "2.0")) || version === '2.1') {
                            var operationId = operation.operationId;
                            var escapeTag = operation.tags[0].replace(/\s/g, '');
                            var category = determineCategory(operation.tags[0]);
                            escapeCategory = category.replace(/\s/g, '');
                            if (!data.categories[escapeCategory]){
                                data.categories[escapeCategory] = { categoryName: category, resources: {}};
                            }
                            if (!data.categories[escapeCategory].resources[escapeTag]) {
                                data.categories[escapeCategory].resources[escapeTag] = { resourceName: operation.tags[0], operations: {}};
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
                            data.categories[escapeCategory].resources[escapeTag].operations[operationId] = _.extend(operation, { verb: verb, path: pathUri, groupedParameters: groupedParameters });
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
