import gulp from 'gulp';
import gulpSpritesmith from 'gulp.spritesmith';

let params = {
    imgName: 'sprite.png',
    imgPath: '../images/sprites/sprite.png',
    cssName: '_sprite.scss',
    padding: 25,
    cssFormat: 'scss',
    algorithm: 'binary-tree',
    cssTemplate: 'scss.sprite.mustache'
};

export default () => {
    var spriteData = gulp.src('src/images/icons/**/*.*')
        .pipe(gulpSpritesmith(params));

    spriteData.img.pipe(gulp.dest('dist/images/sprites/'));
    spriteData.css.pipe(gulp.dest('src/scss/utils/'));
};