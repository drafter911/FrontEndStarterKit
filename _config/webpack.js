import webpack from 'webpack';
import gulpUtil from 'gulp-util';
import wpConfig from '../webpack.config';

export default (RELEASE, browserSync) => {
    gulpUtil.log(gulpUtil.colors.blue('WebPack started'));

    let wConfig = wpConfig(RELEASE),
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