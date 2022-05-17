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
        case 'Product':
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
        default:
            return 'Utilities';
    }
}

gulp.task('reference', ['clean-dist', 'less'], function() {

    var versions = ['1.7', '2.0', '2.1', '2.2', '2.3', '3.0', '3.1', '3.2', '4.0', '5.0', '6.0', 'SaaS'];
    // We construct a reference index file and a complete reference file for each PIM version: 1.7, 2.0 and 2.1.
    // When we construct the 1.7 files, we filter to not include the new 2.0 and the 2.1 endpoints.
    // Same thing when we construct the 2.0 files, we filter to not include the 2.1 endpoints.
    _.forEach(versions, function(version) {

        var htmlReferenceIndexfileName = (version === '1.7') ? 'api-reference-index-17' :
                                        (version === '2.0') ? 'api-reference-index-20' :
                                        (version === '2.1') ? 'api-reference-index-21' :
                                        (version === '2.2') ? 'api-reference-index-22' :
                                        (version === '2.3') ? 'api-reference-index-23' :
                                        (version === '3.0') ? 'api-reference-index-30' :
                                        (version === '3.1') ? 'api-reference-index-31' :
                                        (version === '3.2') ? 'api-reference-index-32' :
                                        (version === '4.0') ? 'api-reference-index-40' : 
                                        (version === '5.0') ? 'api-reference-index-50' :
                                        (version === '6.0') ? 'api-reference-index-60' : 'api-reference-index';
        var htmlReferencefileName = (version === '1.7') ? 'api-reference-17' :
                                    (version === '2.0') ? 'api-reference-20' :
                                    (version === '2.1') ? 'api-reference-21' :
                                    (version === '2.2') ? 'api-reference-22' :
                                    (version === '2.3') ? 'api-reference-23' :
                                    (version === '3.0') ? 'api-reference-30' :
                                    (version === '3.1') ? 'api-reference-31' :
                                    (version === '3.2') ? 'api-reference-32' :
                                    (version === '4.0') ? 'api-reference-40' : 
                                    (version === '5.0') ? 'api-reference-50' :
                                    (version === '6.0') ? 'api-reference-60' : 'api-reference';

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
                        if (_.find(operation['x-versions'], function(o) { return (o === version) || o.startsWith(version.split('.')[0]) && o.endsWith('x'); })) {
                            var escapeTag = operation.tags[0].replace(/\s/g, '');
                            var category = determineCategory(operation.tags[0]);
                            escapeCategory = category.replace(/\s/g, '');
                            if (!data.categories[escapeCategory]){
                                data.categories[escapeCategory] = { categoryName: category, resources: {}};
                                if(escapeCategory === 'PAM') {
                                    data.categories[escapeCategory].categoryDeprecated = true;
                                }
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

        gulp.src('content/swagger/akeneo-web-api.yaml')
            .pipe(swagger('akeneo-web-api.json'))
            .pipe(gulp.dest('content/swagger'))
            .pipe(jsonTransform(async function(data) {
                await ignoreVersionImcompatibleProperties(data, version);
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
                        if (_.find(operation['x-versions'], function(o) { return o === version || o.startsWith(version.split('.')[0]) && o.endsWith('x'); })) {
                            var operationId = operation.operationId;
                            var escapeTag = operation.tags[0].replace(/\s/g, '');
                            var category = determineCategory(operation.tags[0]);
                            escapeCategory = category.replace(/\s/g, '');
                            if (!data.categories[escapeCategory]){
                                data.categories[escapeCategory] = { categoryName: category, resources: {}};
                                if(escapeCategory === 'PAM') {
                                    data.categories[escapeCategory].categoryDeprecated = true;
                                }
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

                                if (response.hasOwnProperty('x-examples-per-version')) {
                                    const sortedExamples = _.reverse(_.sortBy(response['x-examples-per-version'], ['x-version']));
                                    const closestExample = _.find(sortedExamples, function(exemplePerVersion) {
                                        return exemplePerVersion['x-version'] <= version;
                                    });
                                    if (closestExample === undefined) {
                                        console.log('Error: Missing example for version "' + version + '" of route "' + verb + ' ' + pathUri + '"');
                                        return;
                                    }
                                    const stringValue = highlightJs.highlight('json', JSON.stringify(closestExample['x-example'], null, 2), true);
                                    response.hljsExample = '<pre class="hljs"><code>' + stringValue.value + '</code></pre>';
                                    return response;
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
