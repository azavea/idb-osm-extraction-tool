var webpack = require('webpack');
var config = require('./webpack.common.config');

config.mode = 'production';
config.output.path = '/usr/dist/';

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
