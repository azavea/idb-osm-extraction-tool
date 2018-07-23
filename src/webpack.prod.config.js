var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.common.config');

config.mode = 'production';
config.output.path = path.join(__dirname, '..', '..', 'foo.bar');

config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
        },
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    })
);

config.optimization = {
    minimize: true,
};

module.exports = config;
