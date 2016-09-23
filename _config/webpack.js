import webpack from 'webpack';
import gulpUtil from 'gulp-util';
import wpConfig from '../webpack.config';

let webpackParams = {
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

export default (RELEASE, browserSync) => {

    let wConfig = wpConfig(webpackParams, RELEASE),
        bundler = webpack(wConfig),

        bundle = (err, stats) => {
            if (err) throw new gulpUtil.PluginError("webpack", err);
            gulpUtil.log("[webpack]", stats.toString({
                // output options
            }));

            if (browserSync) {
                browserSync.reload();
            }
        };

    RELEASE ? bundler.run(bundle) : bundler.watch(200, bundle);
}