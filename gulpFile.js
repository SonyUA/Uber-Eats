'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var fileinclude = require('gulp-file-include')

function sassToCSS(done) {
    gulp.src('./scss/style.scss')
        .pipe(sass({
            errorLogToConsole: true,
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('./css/'));
    done();
}

function buildHTML() {
    return gulp.src('./pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./src'));
};
gulp.task(
    function include(done) {
        gulp.src('./index.html')
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('./'));
        done()
    }
)
gulp.task('default', gulp.series(watchsassPug))

function watchsassPug() {
    gulp.watch("./scss/**/*", sassToCSS);
    gulp.watch("./pug/**/*", buildHTML);
}
