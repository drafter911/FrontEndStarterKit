var gulp = require('gulp'),
    watch = require('gulp-watch'),
    webpack = require('webpack'),
    sass = require('gulp-sass'),
    gulpUtil = require("gulp-util"),
    sourcemaps = require('gulp-sourcemaps'),
    gulpSpritesmith = require('gulp.spritesmith'),
    browserSync = require('browser-sync').create(),
    rigger = require('gulp-rigger'),

RELEASE = false,

directories = {
    dist: 'dist/',
    src: 'src/'
},

    config = {
        port: 3000,
        browserSync: {
            server: directories.dist
        },
        html: {
            dist: directories.dist,
            base: directories.src + 'templates',
            src: directories.src + 'templates/pages/**/*.html',
            entry: directories.src + 'templates/*.html',
            watch: directories.src + '**/*.html'

        },
        js: {
            dist: directories.dist + 'js/*.js',
            watch: true,
            webpackConfig: './webpack.config.js',
            webpackParams: {
                RELEASE: RELEASE,
                entry: './src/js/main.js',
                input: ['./src/js', './node_modules'],
                output: {
                    path: directories.dist + 'js/',
                    filename: {
                        prod: 'bundle.min.js',
                        dev: 'bundle.js'
                    },
                    chunksFileName: {
                        prod: '../js/[id].bundle.min.js',
                        dev: '../js/[id].bundle.js'
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
            src: directories.src + 'images/icons/*.*',
            params: {
                imgName: 'sprite.png',
                imgPath: '../images/sprites/sprite.png',
                cssName: '_sprite.scss',
                padding: 25,
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                cssTemplate: 'scss.sprite.mustache'
            }
        },
        fonts: {
            src: directories.src + 'fonts',
            dist: directories.dist + 'fonts/'
        }
    };

gulp.task('fonts:copy', function () {
    gulp.src(config.fonts.src + '/**/*', {base: config.fonts.src})
        .pipe(watch(config.fonts.src, {base: config.fonts.src}))
        .pipe(gulp.dest(config.fonts.dist))
        .pipe(browserSync.stream());
});

gulp.task('html:build', function () {
    gulp.src([config.html.src, config.html.entry])
        .pipe(watch(config.html.watch, {base: config.html.base}))
        .pipe(rigger())
        .pipe(gulp.dest(config.html.dist))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['sass:build'], function () {

    browserSync.init({
        server: config.browserSync.server,
        port: config.port,
        ui: {
            port: +config.port + 1
        },
        files: [config.js.dist]
    });

    watch(config.html.watch).on('change', function () {
        setTimeout(function () {
            gulp.start('html:build');
        }, 800);
    });

    watch(config.html.watch, function () {
        setTimeout(function () {
            gulp.start('html:build');
        }, 800);
    });

    watch([config.styles.watch]).on('change', function () {
        gulp.start('sass:build');
    });

    watch(config.sprites.src, function (event, cb) {
        gulp.start('sprite');
    });

    watch([config.fonts.src + '**/*.*'], function () {
        gulp.start('fonts:copy');
    });
});

gulp.task('sass:build', function () {
    return config.styles.RELEASE
        ?
        gulp.src(config.styles.src)
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(gulp.dest(config.styles.dist))
            .pipe(browserSync.stream())
        :
        gulp.src(config.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
            .pipe(sourcemaps.write('../scssMaps'))
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

gulp.task('run', [
    'html:build',
    'fonts:copy',
    'sprite',
    'sass:build',
    'webpack'
]);
gulp.task('default', ['run', 'serve']);