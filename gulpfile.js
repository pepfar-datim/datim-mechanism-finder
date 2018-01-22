const BUILD_DIR = 'build';

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('clean', function (cb) {
    const del = require('del');

    del(BUILD_DIR, cb);
});

gulp.task('build', function (cb) {
    runSequence('clean', ['app'], cb);
});

gulp.task('build-deploy', function (cb) {
    runSequence('build', 'deploy', cb);
});

gulp.task('zip', function () {
    var zip = require('gulp-zip');

    return gulp.src(['./build/**'])
        .pipe(zip('mechanism-finder.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('app', function () {
    return gulp.src([
        'src/**/*.{html,png,gif}',
        'src/manifest.webapp'
    ])
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('deploy', function () {
    return gulp.src(['./build/**'])
        .pipe(gulp.dest('/Users/markadm/Projects/dhis/DHIS2_HOME/apps/mechanism-finder'));
});
