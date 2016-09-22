var gulp = require('gulp'),
    pug = require('gulp-pug');

module.exports = function () {
    return gulp.src(['./src/templates/**/*.pug'])
        .pipe(pug())
        .pipe(gulp.dest('./dist/'));
};
