var watch = require('gulp-watch'),
    webpack = require('webpack'),
    gulpUtil = require("gulp-util"),

    webpackParams = {
        entry: './src/js/main.js',
        input: ['./src/js', './node_modules'],
        output: {
            path: 'dist/js/',
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
        },
        jqueryGlobal: true
    };

function Wp() {
}

module.exports = Wp;

Wp.prototype.dev = function (browserSync) {
    var RELEASE = false,
        wConfig = require('./../webpack.config.js')(webpackParams, RELEASE),
        bundler = webpack(wConfig);

    function bundle(err, stats) {
        if (err) throw new gulpUtil.PluginError("webpack", err);
        gulpUtil.log("[webpack]", stats.toString({
            // output options
        }));

        browserSync.reload();
    }

    bundler.watch(200, bundle);
};

Wp.prototype.production = function () {
    var RELEASE = true,
        wConfig = require('./../webpack.config.js')(webpackParams, RELEASE),
        bundler = webpack(wConfig);

    function bundle(err, stats) {
        if (err) throw new gulpUtil.PluginError("webpack", err);
        gulpUtil.log("[webpack]", stats.toString({
            // output options
        }));
    }

    bundler.run(bundle);
};

