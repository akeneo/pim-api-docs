/**
 * Deploy dist in staging or production
 */
var gulp = require('gulp');
var argv = require('minimist')(process.argv);
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var rsync = require('gulp-rsync');
var prompt = require('gulp-prompt');
var fs = require('fs');

const environments = ['staging', 'production'];

function isFileSync(aPath) {
    try {
        return fs.statSync(aPath).isFile();
    } catch (e) {
        if (e.code === 'ENOENT') {
            return false;
        }

        throw e;
    }
}

gulp.task('deploy', ['create-dist'], function() {
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

    if (!isFileSync('./config.json')) {
        throw new gutil.PluginError({
            plugin: 'deploy',
            message: gutil.colors.red('Missing config.json. Please fill it like config.json.dist')
        });
    }
    var config = require('../config.json');

    if (!argv.env || (environments.indexOf(argv.env) < 0)) {
        throw new gutil.PluginError({
            plugin: 'deploy',
            message: gutil.colors.red('Missing or invalid target, please use ' +
                environments
                    .map(function (env) { return '--env=' + env; })
                    .join(' or ')
            )
        });
    }

    Object.keys(config[argv.env]).forEach(function (key) {
        rsyncConf[key] = config[argv.env][key];
    });

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
