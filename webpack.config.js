var webpack = require('webpack'),
    UglifyJsPlugin = require('uglify-js');

module.exports = function (params) {

    var entry = params.entry,

        output = {
            path: params.output.path,
            //path: __dirname,
            filename: params.RELEASE ? params.output.filename.prod : params.output.filename.dev
        };

    return {
        debug: !params.RELEASE,
        entry: entry,
        output: output,
        plugins: params.RELEASE ?
            [
                new webpack.ProvidePlugin(params.globalModules),
                new webpack.optimize.UglifyJsPlugin({
                    minimize: true
                }),
                new webpack.optimize.AggressiveMergingPlugin()
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
                {test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader'},
                {test: /\.html$/, loader: 'html?config=otherHtmlLoaderConfig'}
            ]
        }
    };
};