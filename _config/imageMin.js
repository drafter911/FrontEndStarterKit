const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

export default () => {
    gulp.src('src/images/pictures/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/pictures'))
};