var gulp = require('gulp'),
    watch = require('gulp-watch');

module.exports = function (bs) {
    gulp.src('src/fonts/**/*', {base: 'src/fonts'})
        .pipe(watch('src/fonts', {base: 'src/fonts'}))
        .pipe(gulp.dest('dist/fonts/'))
        .pipe(bs());
};