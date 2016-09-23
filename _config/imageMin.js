import gulp from 'gulp';
import imageMin from 'gulp-imagemin';

export default () => {
    gulp.src('src/images/pictures/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/images/pictures'));
};