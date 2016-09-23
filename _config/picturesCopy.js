import gulp from 'gulp';
import watch from 'gulp-watch';

export default (bs) => {
    gulp.src('src/images/pictures/**/*', {base: 'src/images/pictures/'})
        .pipe(watch('src/images/pictures/', {base: 'src/images/pictures/'}))
        .pipe(gulp.dest('dist/images/pictures/'))
        .pipe(bs());
};