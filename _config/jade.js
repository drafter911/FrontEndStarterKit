var gulp = require('gulp'),
    gulpJade = require('gulp-jade');


module.exports = function () {
   return gulp.src(['./src/templates/**/*.jade'])
        .pipe(gulpJade())
        .pipe(gulp.dest('./dist/'));
};
