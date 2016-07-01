var webpack = require('webpack'),
    UglifyJsPlugin = require('uglify-js');

module.exports = function (params) {

    var entry = params.entry,

        output = {
            path: params.output.path,
            //path: __dirname,
            filename: params.RELEASE ? params.output.filename.prod : params.output.filename.dev,
            chunkFilename: params.RELEASE ? params.output.chunksFileName.prod : params.output.chunksFileName.dev
        };

    return {
        debug: !params.RELEASE,
        devtool: params.RELEASE ? '' : 'cheap-eval-source-map',
        entry: entry,
        output: output,
        plugins: params.RELEASE ?
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
    };
};