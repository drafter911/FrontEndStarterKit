import gulp from 'gulp';
import watch from 'gulp-watch';
import bs from 'browser-sync';
import Webpack from './_config/webpack';
import picturesCopy from './_config/picturesCopy';
import fontsCopy from './_config/fontsCopy';
import Sass from './_config/sass';
import Sprite from './_config/sprite';
import rigger from './_config/rigger';
import pug from './_config/pug';

const browserSync = bs.create();

let usePug = true; // If You want to use rigger, set 'usePug' to 'false'.

gulp.task('pictures:copy', picturesCopy(browserSync.stream));

gulp.task('fonts:copy', fontsCopy(browserSync.stream));

gulp.task('html:build', () => rigger());

gulp.task('pug:build', () => pug());

gulp.task('html:reload', [usePug ? 'pug:build' : 'html:build'], () => browserSync.reload());

gulp.task('sass:build', () => new Sass(false, browserSync.stream));

gulp.task('webpack:dev', Webpack(false, browserSync));

gulp.task('sprite', () => new Sprite());

gulp.task('serve', () => browserSync.init({
    server: 'dist/',
    port: 3000,
    ui: {
        port: 3001
    }
}));

gulp.task('prod:build', () => {
    Webpack(true);
    new Sass(true);
});

gulp.task('watch', ['serve'], () => {

    watch(['src/fonts/**/*.*'], () => gulp.start('fonts:copy'));

    watch('src/images/icons/**/*.*', () => gulp.start('sprite'));

    watch(['src/images/pictures/**/*.*'], () => gulp.start('pictures:copy'));

    watch(['src/scss/**']).on('change', () => gulp.start('sass:build'));

    watch('src/templates/**/*.pug', () => gulp.start('pug:build'));

    usePug ?
        watch('src/templates/**/*.pug', () => gulp.start('html:reload'))
        :
        watch('src/templates/**/*.html', () => gulp.start('html:reload'));
});

gulp.task('run', [
    'fonts:copy',
    'sprite',
    'sass:build',
    'pictures:copy',
    'webpack:dev',
    'html:reload'
]);

gulp.task('default', ['run', 'serve', 'watch']);