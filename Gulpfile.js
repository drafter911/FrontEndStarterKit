var gulp = require('gulp'),
    watch = require('gulp-watch'),
    bs = require('browser-sync'),
    browserSync = require('browser-sync').create(),
    webpack = require('./_config/webpack'),
    picturesCopy = require('./_config/picturesCopy'),
    fontsCopy = require('./_config/fontsCopy'),
    sass = require('./_config/sass'),
    sprite = require('./_config/sprite'),

    // If You want to use rigger, set 'useJade' to 'false'.

    useJade = true,
    rigger = require('./_config/rigger'),
    jade = require('./_config/jade');

gulp.task('pictures:copy', picturesCopy(browserSync.stream));

gulp.task('fonts:copy', fontsCopy(browserSync.stream));

gulp.task('html:build', function () {
    rigger();
});

gulp.task('jade:build', function () {
    jade();
});

gulp.task('sass:build', function () {
    new sass(browserSync.stream, false);
});

gulp.task('webpack:dev', webpack.prototype.dev(browserSync));

gulp.task('webpack:prod', webpack.prototype.production());

gulp.task('sprite', function () {
    new sprite();
});

gulp.task('serve', function () {
    browserSync.init({
        server: 'dist/',
        port: 3000,
        ui: {
            port: 3001
        }
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

gulp.task('html:reload', [useJade ? 'jade:build' : 'html:build'], function (done) {
    setTimeout(function () {
        browserSync.reload();
        done();
    }, 500);
});

useJade ?
    watch('src/templates/**/*.jade', function () {
        gulp.start('html:reload');
    })
    :
    watch('src/templates/**/*.html', function () {
        gulp.start('html:reload');
    });

gulp.task('run', [
    'fonts:copy',
    'sprite',
    'sass:build',
    'pictures:copy',
    'webpack:dev',
    'html:reload'
]);
gulp.task('default', ['run', 'serve']);