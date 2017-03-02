var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var hbs = require('handlebars');
var gulpHandlebars = require('gulp-handlebars-html')(hbs);
var jsonTransform = require('gulp-json-transform');
var swagger = require('gulp-swagger');
var path = require('path');
var MarkdownIt = require('markdown-it');
var gulpMarkdownIt = require('gulp-markdown-it-adapter');
var highlightJs = require('highlightjs');
var concat = require('gulp-concat');
var mdToc = require('markdown-it-toc-and-anchor').default;
var webserver = require('gulp-webserver');
var _ = require('lodash');
var del = require('del');
var merge = require('merge-stream');
var gutil = require('gulp-util');
var argv  = require('minimist')(process.argv);
var rsync = require('gulp-rsync');
var prompt = require('gulp-prompt');
var gulpif = require('gulp-if');
 
// Transform less into css file that is put into dist directory
gulp.task('less', ['clean-dist'], function () {
   return gulp.src('./styles/variables.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css'));
});

// Copy html, css, js and image files into dist directory
gulp.task('copy', ['clean-dist'], function(){
  var html = gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'));
  var fa = gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('dist/css/'));
  var lib = gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/handlebars/handlebars.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(gulp.dest('dist/js/'));
  var img = gulp.src('content/img/*')
    .pipe(gulp.dest('dist/img/'));

  return merge(html, fa, lib, img); 
});

gulp.task('hbs', ['clean-dist'], function () {
  gulp.src('./content/akeneo-web-api.yaml')
    .pipe(swagger('akeneo-web-api.json'))
    .pipe(jsonTransform(function(data, file) {
      var templateData = data;
      data.ressources = {};
      _.forEach(data.paths, function(path, pathUri){
        var escapedPathUri = pathUri.replace(/\//g, '_').replace(/{/g, '_').replace(/}/g, '_');
        _.forEach(path, function(operation,verb){
          if(!data.ressources[operation.tags[0]]){
            data.ressources[operation.tags[0]] = {};
          }
          var extendedOperation = _.extend(operation, {verb: verb, path: pathUri});
          data.ressources[operation.tags[0]][verb+escapedPathUri] = extendedOperation;
        });
      });
      return gulp.src('src/api-reference/index.handlebars')
          .pipe(gulpHandlebars(templateData, {}))
          .pipe(rename('api-reference-index.html'))
          .pipe(gulp.dest('dist'));
    }));

  gulp.src('./content/akeneo-web-api.yaml')
    .pipe(swagger('akeneo-web-api.json'))
    .pipe(jsonTransform(function(data, file) {
      var templateData = data;
      data.ressources = {};
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
          if(!data.ressources[operation.tags[0]]){
            data.ressources[operation.tags[0]] = {};
          }
          var groupedParameters =_.groupBy(operation.parameters, function(parameter){
            return parameter.in;
          });
          _.map(groupedParameters.body, function(parameter){
            _.map(parameter.schema.properties, function(property){
              var generatedExample = undefined;
              if(property.type === 'string'){
                generatedExample = {type:'string', sample: '"string"'};
              }
              if(property.type === 'boolean'){
                generatedExample = {type:'literal', sample: 'true'};
              }
              if(property.type === 'integer'){
                generatedExample = {type:'number', sample: '10'};
              }
              if(property.type === 'array' && property.items.type){
                generatedExample = {type:'array'};
                if(property.items.type){
                  _.extend(generatedExample, {items_type:'string', items_sample:'"string"'});
                }
              }
              return _.extend(property, {example: generatedExample});
            });
            return parameter;
          });
          _.map(operation.responses, function(response, code){
            var status = code.match(/^2.*$/) ? 'success' : 'error';
            response[status] = true;
            response.id = operationId + '_' + code;
            if(response.examples){
              var highlightjsExample = highlightJs.highlight('json', JSON.stringify(response.examples, null, 2), true);
              response.example = '<pre class="hljs"><code>' + highlightjsExample.value + '</code></pre>';
            }
            return response;
          });
          var extendedOperation = _.extend(operation, {verb: verb, path: pathUri, groupedParameters:groupedParameters});
          data.ressources[operation.tags[0]][operationId] = extendedOperation;
        });
      });
      return gulp.src('src/api-reference/reference.handlebars')
          .pipe(gulpHandlebars(templateData, {}))
          .pipe(rename('api-reference.html'))
          .pipe(gulp.dest('dist'));
    }));
});


// Transform content written in markdown into html and put it into dist directory
gulp.task('markdownize', ['clean-dist'],function (){
  var optionsMd = {
    html: false,
    xhtmlOut: true,
    typographer: false,
    linkify: false,
    breaks: false,
    highlight: highlight
  };
  var optionsToc = {
    toc: false,
    tocFirstLevel: 2,
    tocLastLevel: 3,
    anchorLink: true,
    anchorLinkSpace: false,
    anchorLinkBefore: true,
    tocClassName: 'table-of-contents'
  };

  var md = new MarkdownIt('default', optionsMd);
  function imageTokenOverride(tokens, idx, options, env, self) {
    return '<img class="img-responsive" alt="'+ tokens[idx].content +'" src="'+ tokens[idx].attrs[0][1] + '"/>';
  }
  md.renderer.rules['image'] = imageTokenOverride;
  md.renderer.rules.table_open = function(tokens, idx) {
    return '<table class="table">';
  };
  md.renderer.rules.heading_open = function(tokens, idx) {
    return '<a class="anchor" id="' + tokens[idx].attrs[0][1] + '"></a>'+
      '<'+tokens[idx].tag+' title-id="' + tokens[idx].attrs[0][1] + '">';
  };

  md.use(mdToc, optionsToc)
    .use(require('markdown-it-container'), 'panel-link', {
      validate: function(params) {
        return params.trim().match(/^panel-link\s+(.*)$/);
      },
      render: function (tokens, idx) {
        var text = tokens[idx].info.trim().match(/^panel-link\s+(.*)\[.*\].*$/);
        var linkTitle = tokens[idx].info.trim().match(/^panel-link\s+.*\[(.*)\].*$/);
        var link = tokens[idx].info.trim().match(/^panel-link\s+.*\((.*)\)$/);
        if (tokens[idx].nesting === 1) {
          // opening tag
          return '<div class="panel panel-default panel-link">'+
            '<div class="panel-body">' +
            '<div class="row"><div class="col-md-8"><h4>'+ md.utils.escapeHtml(text[1]) + '</h4></div>'+
            '<div class="col-md-4">'+
            '<a class="btn btn-warning pull-right" href="'+ md.utils.escapeHtml(link[1])+'">'+ md.utils.escapeHtml(linkTitle[1])+ '</a></div></div>\n'+
            '<div class="row"><div class="col-md-8">';
        } else {
          // closing tag
          return '</div></div></div></div>\n';
        }
      }
    })
    .use(require('markdown-it-container'), 'danger', {
      validate: function(params) {
        return params.trim().match(/^danger(.*)$/);
          },
      render: function (tokens, idx) {
        return (tokens[idx].nesting === 1) ? '<div class="alert alert-danger">' : '</div>\n';
      }
    })
    .use(require('markdown-it-container'), 'warning', {
      validate: function(params) {
        return params.trim().match(/^warning(.*)$/);
          },
      render: function (tokens, idx) {
        return (tokens[idx].nesting === 1) ? '<div class="alert alert-warning">' : '</div>\n';
      }
    })
    .use(require('markdown-it-container'), 'info', {
      validate: function(params) {
        return params.trim().match(/^info(.*)$/);
          },
      render: function (tokens, idx) {
        return (tokens[idx].nesting === 1) ? '<div class="alert alert-info">' : '</div>\n';
      }
    });
        

    return gulp.src([
        'content/overview.md',
        'content/basics.md',
        'content/security.md',
        'content/format.md',
        'content/responses.md',
        'content/pagination.md',
        'content/update.md'
      ])
      .pipe(concat('content.md'))
      .pipe(gulpMarkdownIt(md))
      .pipe(gulp.dest('./dist/content'));
  }
);

function highlight(str, lang) {
  if (lang && highlightJs.getLanguage(lang)) {
    try {
      return '<pre class="hljs"><code>' +
        highlightJs.highlight(lang, str, true).value +
          '</code></pre>';
    } catch (__) {}
  }
  return '<pre class="hljs"><code>' + str + '</code></pre>';
}

// Clean dist directory
gulp.task('clean-dist', function () {
  return del(['dist/*']);
});


// Watch if mardown, less, html or image files have changed
// so as to relaunch the build into dist directory
// Should be used for dev purpose
gulp.task('watch', ['create-dist'], function() {
  gulp.watch('content/*.md', ['create-dist']);
  gulp.watch('styles/*.less', ['create-dist']);
  gulp.watch('src/*.html', ['create-dist']);
  gulp.watch('src/api-reference/*.handlebars',['create-dist']);
  gulp.watch('content/img/*', ['create-dist']);
});

// Launch a server with dist directory exposed on it
// Should be used for dev purpose
gulp.task('launch-webserver', ['create-dist'], function() {
  return gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('deploy', function() {
  
  // Dirs and Files to sync
  rsyncPaths = ['./dist/*' ];
  
  // Default options for rsync
  rsyncConf = {
    progress: true,
    incremental: true,
    relative: false,
    emptyDirectories: true,
    recursive: true,
    clean: true,
    exclude: [],
  };
  
  if (argv.staging) {
    rsyncConf.hostname = 'api-staging.akeneo.com'; // hostname
    rsyncConf.username = 'akeneo'; // ssh username
    rsyncConf.destination = '/var/www/html'; // path where uploaded files go
  } else if (argv.production) {
    rsyncConf.hostname = 'api'; // hostname
    rsyncConf.username = 'akeneo'; // ssh username
    rsyncConf.destination = '/var/www/html'; // path where uploaded files go
  } else {
    throwError('deploy', gutil.colors.red('Missing or invalid target'));
  }
  
  return gulp.src(rsyncPaths)
  .pipe(gulpif(
      argv.production, 
      prompt.confirm({
        message: 'Heads Up! Are you SURE you want to push to PRODUCTION?',
        default: false
      })
  ))
  .pipe(rsync(rsyncConf));

});


function throwError(taskName, msg) {
  throw new gutil.PluginError({
      plugin: taskName,
      message: msg
    });
}

// Build the documentation is dist directory
gulp.task('create-dist', [
  'less',
  'copy',
  'hbs',
  'markdownize'
]);

// Main task that should be used for development purpose
gulp.task('serve', [
  'launch-webserver',
  'watch'
]);
