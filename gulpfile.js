var gulp = require('gulp');
var webserver = require('gulp-webserver');
var del = require('del');

var requireDir = require('require-dir');
var tasks = requireDir('./tasks');

// Clean dist directory
gulp.task('clean-dist', function () {
  return del(['dist/*', 'tmp/*']);
});

// Watch if markdown, less, html or image files have changed
// so as to relaunch the build into dist directory
// Should be used for dev purpose
gulp.task('watch', ['create-dist'], function() {
  gulp.watch('content/**/*.md', ['create-dist']);
  gulp.watch('content/img/**/*', ['create-dist']);
  gulp.watch('content/swagger/**/*.yaml', ['create-dist']);
  gulp.watch('content/beta/**/*.yaml', ['create-dist']);
  gulp.watch('styles/**/*.less', ['create-dist']);
  gulp.watch('src/**/*.handlebars', ['create-dist']);
});

// Launch a server with dist directory exposed on it
// Should be used for dev purpose
gulp.task('launch-webserver', ['create-dist'], function() {
  return gulp.src('dist')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

// Build the documentation is dist directory
gulp.task('create-dist', [
  'clean-dist',
  'less',
  'copy-assets',
  'reference',
  'landings',
  'build-concepts',
  'build-rest-api',
  'build-graphql',
  'build-supplier-data-manager',
  'build-events-api',
  'build-php-client',
  'build-misc-documentation',
  'build-guides',
  'build-getting-started',
  'build-events-reference-page',
  'build-app-developer-tools',
  'build-apps',
  'build-app-portal',
  'build-tutorials-homepage',
  'build-tutorials',
  'build-news',
  'build-redirections',
]);

// Main task that should be used for development purpose
gulp.task('serve', [
  'launch-webserver',
  'watch'
]);
