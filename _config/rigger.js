import gulp from 'gulp';
import rigger from 'gulp-rigger';

export default () => {
    return gulp.src(['src/templates/pages/**/*.html', 'src/templates/*.html'])
        .pipe(rigger())
        .pipe(gulp.dest('dist/'));
};