import gulp from 'gulp';
import svgSpriteSheet from 'gulp-svg-spritesheet';
import svgMin from 'gulp-svgmin';

export default () => {
    gulp.src('src/images/svg/*.svg')
        .pipe(svgSpriteSheet({
            cssPathSvg: '../images/svg-sprites/sprite.svg',
            padding: 5,
            pixelBase: 16,
            templateSrc: 'scss.svg-sprite.mustache',
            templateDest: 'src/scss/utils/svg-sprite.scss'
        }))
        .pipe(svgMin())
        .pipe(gulp.dest('dist/images/svg-sprites/sprite.svg'));
};