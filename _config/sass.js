import gulp from 'gulp';
import sass from 'gulp-sass';
import sourceMaps from 'gulp-sourcemaps';

export default (RELEASE, bs) => {
    return RELEASE
        ?
        gulp.src('src/scss/style.scss')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(gulp.dest('dist/css/'))
        :
        gulp.src('src/scss/style.scss')
            .pipe(sourceMaps.init())
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(sourceMaps.write('../scssMaps'))
            .pipe(gulp.dest('dist/css/'))
            .pipe(bs());
};