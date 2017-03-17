/**
 * Compile landing pages with Handlebars
 */
var gulp = require('gulp');
var hbs = require('handlebars');
var gulpHandlebars = require('gulp-handlebars-html')(hbs);
var rename = require('gulp-rename');
var flatmap = require('gulp-flatmap');
var path = require('path');

gulp.task('landings', function() {
    return gulp.src('src/*.handlebars')
        .pipe(flatmap(function(stream, file){
            return gulp.src(file.path)
                .pipe(gulpHandlebars({}, {
                    partialsDirectory: ['./src/partials']
                }))
                .pipe(rename(path.basename(file.path).replace(/\.handlebars$/, '.html')))
                .pipe(gulp.dest('dist'));
        }))
});
