import gulp from 'gulp';
import watch from 'gulp-watch';

export default (bs) => {
    gulp.src('src/fonts/**/*', {base: 'src/fonts'})
        .pipe(watch('src/fonts', {base: 'src/fonts'}))
        .pipe(gulp.dest('dist/fonts/'))
        .pipe(bs());
};