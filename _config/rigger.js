var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rigger = require('gulp-rigger');

module.exports = function (bs) {
    gulp.src(['src/templates/pages/**/*.html', 'src/templates/*.html'])
        .pipe(watch('src/**/*.html', {base: 'src/templates'}))
        .pipe(rigger())
        .pipe(gulp.dest('dist/'))
        .pipe(bs());
};