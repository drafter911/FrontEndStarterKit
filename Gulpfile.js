var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    webpack = require('./_config/webpack'),
    picturesCopy = require('./_config/picturesCopy'),
    fontsCopy = require('./_config/fontsCopy'),
    sass = require('./_config/sass'),
    sprite = require('./_config/sprite'),
    rigger = require('./_config/rigger');

gulp.task('pictures:copy', picturesCopy(browserSync.stream));

gulp.task('fonts:copy', fontsCopy(browserSync.stream));

gulp.task('html:build', rigger(browserSync.stream));

gulp.task('sass:build', function () { new sass(browserSync.stream, false); });

gulp.task('webpack:dev', webpack.prototype.dev(browserSync));

gulp.task('webpack:prod', webpack.prototype.production());

gulp.task('sprite', function () { new sprite(); });

gulp.task('serve', function () {
    browserSync.init({
        server: 'dist/',
        port: 3000,
        ui: {
            port: 3001
        }
    });

    watch('src/**/*.html', function () {
        setTimeout(function () {
            gulp.start('html:build');
        }, 800);
    });

    watch(['src/scss/**']).on('change', function () {
        gulp.start('sass:build');
    });

    watch('src/images/icons/**/*.*', function (event, cb) {
        gulp.start('sprite');
    });

    watch(['src/fonts/**/*.*'], function () {
        gulp.start('fonts:copy');
    });

    watch(['src/images/pictures/**/*.*'], function () {
        gulp.start('pictures:copy');
    });
});

gulp.task('run', [
    'html:build',
    'fonts:copy',
    'sprite',
    'sass:build',
    'pictures:copy',
    'webpack:dev'
]);
gulp.task('default', ['run', 'serve']);