/**
 * Transform less into css file that is put into dist directory
 */
var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', ['clean-dist'], function () {
    return gulp.src('./styles/variables.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./dist/css'));
});
