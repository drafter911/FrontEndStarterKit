import gulp from 'gulp';
import pug from 'gulp-pug';

export default () => {
    return gulp.src(['./src/templates/**/*.pug'])
        .pipe(pug())
        .pipe(gulp.dest('./dist/'));
};
