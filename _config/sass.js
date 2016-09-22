var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

module.exports = function (bs, RELEASE) {
    return RELEASE
        ?
        gulp.src('src/scss/style.scss')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(gulp.dest('dist/css/'))
        :
        gulp.src('src/scss/style.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(sourcemaps.write('../scssMaps'))
            .pipe(gulp.dest('dist/css/'))
            .pipe(bs());
};