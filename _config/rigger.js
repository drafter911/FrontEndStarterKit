var gulp = require('gulp'),
    rigger = require('gulp-rigger');

module.exports = function () {
    return gulp.src(['src/templates/pages/**/*.html', 'src/templates/*.html'])
        .pipe(rigger())
        .pipe(gulp.dest('dist/'));
};