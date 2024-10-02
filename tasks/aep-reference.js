/**
 * Compile API Reference index and Complete Reference with handlebars
 *
 * This script will:
 * - load the api YAML
 * - transform it to JSON
 * - Create HTML from Handlebars
 */
var gulp = require('gulp');
var hbs = require('handlebars');
var gulpHandlebars = require('gulp-handlebars-html')(hbs);
var rename = require('gulp-rename');
var revReplace = require('gulp-rev-replace');
var SwaggerParser = require("@apidevtools/swagger-parser");
const _ = require("lodash");
const highlightJs = require("highlightjs");

function highlightJson(body) {
    return highlightJs.highlight('json', JSON.stringify(body, null, 2), true).value;
}

gulp.task('build-aep-reference-page', ['clean-dist', 'less'], async function () {
    const apiData = await SwaggerParser.dereference("content/swagger/aep/public-oas.yml");

    apiData.categories = {};

    Object.keys(apiData.paths).forEach((path) => {
        const resource = apiData.paths[path];

        Object.keys(resource).forEach((verb) => {
            const operation = resource[verb]
            const tag = operation.tags[0];

            if (!apiData.categories[tag]) {
                apiData.categories[tag] = { resourceName: tag, operations: {}};
            }

            const groupedParameters = _.groupBy(operation.parameters, function(parameter) {
                return parameter.in;
            });

            _.map(operation.responses, function(response, code) {
                var status = code.match(/^2.*$/) ? 'success' : 'error';
                response[status] = true;
                response.id = operation.operationId + '_' + code;

                const schema = response?.content?.["application/json"]?.schema;
                // In case the object in response use AllOf, Oneof ... we don't have directly properties, but items first
                response.jsonBody = schema?.properties ?? schema?.items ? highlightJson(schema.properties ?? schema?.items) : "";
                response.jsonExample = schema?.example ? highlightJson(schema.example) : "";


                return response;
            });

            const schema = operation?.requestBody?.content?.["application/json"]?.schema;

            const jsonBody = schema?.properties ? highlightJson(schema.properties) : "";
            const jsonExample = schema?.example ? highlightJson(schema.example) : "";

            apiData.categories[tag].operations[operation.operationId] = _.extend(operation, {
                verb: verb,
                path: path,
                groupedParameters: groupedParameters,
                jsonBody: jsonBody,
                jsonExample: jsonExample,
            });
        })
    });

    return gulp.src('src/aep-reference/reference.handlebars')
        .pipe(gulpHandlebars(apiData, {}))
        .pipe(rename('event-platform/api-reference.html'))
        .pipe(revReplace({manifest: gulp.src("./tmp/rev/rev-manifest.json")}))
        .pipe(gulp.dest('dist'));
});
