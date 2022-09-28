/**
 * Copy html, css, js and image files into dist directory
 */
var gulp = require('gulp');
var merge = require('merge-stream');

gulp.task('copy-assets', ['clean-dist'], function(){
    var fa = gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('dist/css/'));
    var fonts = gulp.src(['node_modules/font-awesome/fonts/*',
              'node_modules/lato-font/fonts/lato-light/*',
              'node_modules/lato-font/fonts/lato-light-italic/*',
              'node_modules/lato-font/fonts/lato-normal/*',
              'node_modules/lato-font/fonts/lato-normal-italic/*',
              'node_modules/lato-font/fonts/lato-medium/*',
              'node_modules/lato-font/fonts/lato-medium-italic/*',
              'node_modules/lato-font/fonts/lato-semibold/*',
              'node_modules/lato-font/fonts/lato-semibold-italic/*',
              'node_modules/lato-font/fonts/lato-bold/*',
              'node_modules/lato-font/fonts/lato-bold-italic/*'])
        .pipe(gulp.dest('dist/fonts/'));
    var lib = gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/handlebars/handlebars.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest('dist/js/'));
    var img = gulp.src('content/img/**')
        .pipe(gulp.dest('dist/img/'));
    var files = gulp.src('content/files/*')
        .pipe(gulp.dest('dist/files/'));
    var files = gulp.src('content/mapping/**')
        .pipe(gulp.dest('dist/mapping/'));

    return merge(fa, fonts, lib, img);
});
