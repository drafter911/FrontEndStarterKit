var gulp = require('gulp'),
    watch = require('gulp-watch');

module.exports = function (bs) {
    gulp.src('src/images/pictures/**/*', {base: 'src/images/pictures/'})
        .pipe(watch('src/images/pictures/', {base: 'src/images/pictures/'}))
        .pipe(gulp.dest('dist/images/pictures/'))
        .pipe(bs());
};