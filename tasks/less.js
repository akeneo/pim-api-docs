/**
 * Transform less into css file that is put into dist directory
 */
var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var rev = require('gulp-rev');

gulp.task('less', ['clean-dist'], function () {
    return gulp.src('./styles/variables.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(rev())
        .pipe(gulp.dest('./dist/css'))
        .pipe(rev.manifest())
        .pipe( gulp.dest('./tmp/rev'));
});
