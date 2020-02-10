/**
 * Deploy dist in staging or production
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var rsync = require('gulp-rsync');

gulp.task('deploy', ['create-dist'], function() {
    // Dirs and Files to sync
    let rsyncPaths = ['./dist/*' ];

    if (process.env.HOSTNAME === undefined) {
        throw new gutil.PluginError({
            plugin: 'deploy',
            message: gutil.colors.red('HOSTNAME environment variable is not set. Please define it before deploying.')
        });
    }

    if (process.env.PORT === undefined) {
        throw new gutil.PluginError({
            plugin: 'deploy',
            message: gutil.colors.red('PORT environment variable is not set. Please define it before deploying.')
        });
    }

    // silent mode is activated to prevent to display hostname and port on the CI for security concern
    return gulp.src(rsyncPaths)
        .pipe(rsync({
            hostname: process.env.HOSTNAME,
            username: "akeneo",
            destination: "/var/www/html",
            progress: false,
            incremental: true,
            relative: false,
            emptyDirectories: true,
            recursive: true,
            clean: true,
            exclude: [],
            shell: "ssh -o StrictHostKeyChecking=no -p " + process.env.PORT,
            command: false,
            silent: true
        }));
});
