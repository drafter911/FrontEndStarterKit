var gulp = require('gulp'),
    watch = require('gulp-watch'),
    webpack = require('webpack'),
    sass = require('gulp-sass'),
    gulpUtil = require("gulp-util"),
    gulpSpritesmith = require('gulp.spritesmith'),
    browserSync = require('browser-sync').create(),

    RELEASE = false,

    directories = {
        dist: 'public/',
        src: 'src/'
    },

    config = {
        port: 3000,
        entry: directories.dist + '*.html',
        browserSync: {
          server: directories.dist
        },
        js: {
            dist: directories.dist + 'js/*.js',
            watch: true,
            webpackConfig: './webpack.config.js',
            webpackParams: {
                RELEASE: RELEASE,
                entry: './src/main.js',
                input: ['./src/js', './node_modules'],
                output: {
                    path: directories.dist + 'js/',
                    filename: {
                        prod: 'bundle.min.js',
                        dev: 'bundle.js'
                    }
                },
                globalModules: {
                    $: "jquery",
                    jQuery: "jquery",
                    "window.jQuery": "jquery"
                }
            }
        },
        styles: {
            dist: directories.dist + 'css/',
            watch: directories.src + 'scss/**',
            src: directories.src + 'scss/style.scss',
            RELEASE: RELEASE
        },
        sprites: {
            dist: {
                img: directories.dist + 'images/sprites/',
                styles: directories.src + 'scss/utils/'
            },
            src: directories.dist + 'images/icons/*.*',
            params: {
                imgName: 'sprite.png',
                imgPath: '../images/sprites/sprite.png',
                cssName: '_sprite.scss',
                padding: 25,
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                cssTemplate: 'scss.sprite.mustache'
            }
        }
    };

gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: config.browserSync.server,
        port: config.port,
        ui: {
            port: +config.port + 1
        },
        files: [config.js.dist]
    });

    watch(config.entry).on('change', browserSync.reload);
    watch([config.styles.watch]).on('change', function () {
        gulp.start('sass');
    });
    watch(config.sprites.src, function(event, cb) {
        gulp.start('sprite');
    });
});

gulp.task('sass', function () {
    return gulp.src(config.styles.src)
        .pipe(sass({outputStyle: config.styles.RELEASE ? 'compressed' : 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(config.styles.dist))
        .pipe(browserSync.stream());
});

gulp.task('webpack', function () {
    var wConfig = require(config.js.webpackConfig)(config.js.webpackParams),
        bundler = webpack(wConfig);

    function bundle(err, stats) {
        if (err) throw new gulpUtil.PluginError("webpack", err);
        gulpUtil.log("[webpack]", stats.toString({
            // output options
        }));

        if (config.js.watch) {
            browserSync.reload();
        }
    }

    if (config.js.watch) {
        bundler.watch(200, bundle);
    } else {
        bundler.run(bundle);
    }
});

gulp.task('sprite', function () {
    var spriteData = gulp.src(config.sprites.src)
        .pipe(gulpSpritesmith(config.sprites.params));

    spriteData.img.pipe(gulp.dest(config.sprites.dist.img));
    spriteData.css.pipe(gulp.dest(config.sprites.dist.styles));
});

gulp.task('run', ['serve', 'sass', 'webpack', 'sprite']);
gulp.task('default', ['run']);