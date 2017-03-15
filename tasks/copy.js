/**
 * Copy html, css, js and image files into dist directory
 */
var gulp = require('gulp');
var merge = require('merge-stream');

gulp.task('copy', ['clean-dist'], function(){
    var fa = gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('dist/css/'));
    var font = gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('dist/fonts/'));
    var lib = gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/handlebars/handlebars.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest('dist/js/'));
    var img = gulp.src('content/img/*')
        .pipe(gulp.dest('dist/img/'));

    return merge(fa, font, lib, img);
});
