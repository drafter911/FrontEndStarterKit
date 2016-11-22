var webpack = require('webpack'),
    UglifyJsPlugin = require('uglify-js');

module.exports = function (RELEASE) {

    var params = {
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

    var entry = params.entry,

        output = {
            path: params.output.path,
            filename: RELEASE ? params.output.filename.prod : params.output.filename.dev,
            chunkFilename: RELEASE ? params.output.chunksFileName.prod : params.output.chunksFileName.dev
        },

        config = {
            debug: !RELEASE,
            devtool: RELEASE ? '' : 'cheap-eval-source-map',
            entry: entry,
            output: output,
            plugins: RELEASE ?
                [
                    new webpack.ProvidePlugin(params.globalModules),
                    new webpack.optimize.UglifyJsPlugin({
                        minimize: true
                    })
                ]
                :
                [
                    new webpack.ProvidePlugin(params.globalModules)
                ],
            resolve: {
                modulesDirectories: params.input
            },
            module: {
                loaders: [
                    {
                        test: /\.js?$/,
                        exclude: /node_modules/,
                        loader: 'babel',
                        query: {
                            // https://github.com/babel/babel-loader#options
                            cacheDirectory: true,
                            presets: ['es2015']
                        }
                    },
                    {test: /\.html$/, loader: 'html?config=otherHtmlLoaderConfig'}
                ]
            }
        },

        isjQueryGlobal = function (is$Global) {
            if (is$Global) {
                config.module.loaders.push({ test: require.resolve("jquery"), loader: "expose?$!expose?jQuery" });
            }
        }(params.jqueryGlobal);

    return config;
};