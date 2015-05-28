'use strict';

const BUILD_DIR = 'build';

const gulp = require('gulp');

gulp.task('clean', function (cb) {
    var del = require('del');

    del(BUILD_DIR, cb);
});

gulp.task('build-deploy', function (cb) {
    var runSequence = require('run-sequence');
    runSequence('clean', ['app', 'pack', 'deps', 'sass'], 'deploy');
});

gulp.task('build-prod', function (cb) {
    var runSequence = require('run-sequence');
    runSequence('clean', ['app', 'pack', 'deps', 'sass'], 'zip');
});

gulp.task('zip', function () {
    var zip = require('gulp-zip');

    return gulp.src(['./build/**'])
        .pipe(zip('mechanism-finder.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('pack', function (cb) {
    var Builder = require('systemjs-builder');
    var builder = new Builder({});

    builder.loadConfig('./src/config.js')
        .then(function () {
            builder.config({
                paths: {
                    'json': './src/*.js',
                    'app': './src/*.js'
                },
                meta: {
                    'manifest.webapp!json': { build: false},
                    'manifest.webapp': { build: false}
                }
            });

            return builder.build('app', BUILD_DIR + '/wimm.js', { minify: true, mangle: false, sourceMaps: true })
                .then(function () {
                    cb();
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
});

gulp.task('app', function () {
    return gulp.src([
        'src/**/*.{html,png}',
        'src/config.js',
        'src/manifest.webapp'
    ])
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('deps', function () {
    return gulp.src(['jspm_packages/*'])
        .pipe(gulp.dest([BUILD_DIR, 'jspm_packages'].join('/')));
});

gulp.task('sass', function () {
    var rubySass = require('gulp-ruby-sass');
    return rubySass(['./src/app.sass'], {loadPath: './src', style: 'expanded', compass: true})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest(
            [BUILD_DIR, 'css'].join('/')
        ));
});

gulp.task('deploy', function () {
    return gulp.src(['./build/**'])
        .pipe(gulp.dest('/Users/markadm/Projects/dhis/DHIS2_HOME/apps/where-is-my-mechanism'));
});
