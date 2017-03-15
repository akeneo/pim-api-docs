/**
 * Deploy dist in staging or production
 */
var gulp = require('gulp');
var argv = require('minimist')(process.argv);
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var rsync = require('gulp-rsync');
var prompt = require('gulp-prompt');

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
        rsyncConf.hostname = 'api-staging'; // hostname
        rsyncConf.username = 'akeneo'; // ssh username
        rsyncConf.destination = '/var/www/html'; // path where uploaded files go
    } else if (argv.production) {
        rsyncConf.hostname = 'api'; // hostname
        rsyncConf.username = 'akeneo'; // ssh username
        rsyncConf.destination = '/var/www/html'; // path where uploaded files go
    } else {
        throw new gutil.PluginError({
            plugin: 'deploy',
            message: gutil.colors.red('Missing or invalid target')
        });
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
