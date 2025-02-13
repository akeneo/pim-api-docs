/**
 * Copy html, css, js and image files into dist directory
 */
var gulp = require('gulp');
var merge = require('merge-stream');

gulp.task('copy-assets', ['clean-dist'], function(){
    var fa = gulp.src(['node_modules/font-awesome/css/font-awesome.min.css',
            'node_modules/prismjs/themes/prism-okaidia.css'])
        .pipe(gulp.dest('dist/css/'));
    var fonts = gulp.src('content/fonts/*')
            .pipe(gulp.dest('dist/fonts/'));
    var lib = gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/handlebars/handlebars.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/isotope-layout/dist/isotope.pkgd.min.js',
            'node_modules/prismjs/prism.js'])
        .pipe(gulp.dest('dist/js/'));
    var img = gulp.src('content/img/**')
        .pipe(gulp.dest('dist/img/'));
    var files = gulp.src('content/files/*')
        .pipe(gulp.dest('dist/files/'));
    var mapping = gulp.src('content/mapping/**')
      .pipe(gulp.dest('dist/mapping/'));
    var uiextensions = gulp.src('content/extensions/ui-extensions/postman/**')
      .pipe(gulp.dest('dist/extensions/ui-extensions/'));

    return merge(fa, fonts, lib, img);
});
