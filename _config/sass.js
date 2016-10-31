import gulp from 'gulp';
import sass from 'gulp-sass';
import sourceMaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';

export default (RELEASE, bs) => {

    let autoprefixerConfig = {
        browsers: ['last 2 versions'],
        cascade: false
    };

    return RELEASE
        ?
        gulp.src('src/scss/style.scss')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(autoprefixer(autoprefixerConfig))
            .pipe(gulp.dest('dist/css/'))
        :
        gulp.src('src/scss/style.scss')
            .pipe(sourceMaps.init())
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(autoprefixer(autoprefixerConfig))
            .pipe(sourceMaps.write('../scssMaps'))
            .pipe(gulp.dest('dist/css/'))
            .pipe(bs());
};