var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var outputPath = path.join(__dirname, '..', 'dist');

module.exports = {
    entry: {
        app: ['babel-polyfill', './js/src/main.jsx'],
    },
    output: {
        path: outputPath,
        publicPath: '/',
        filename: '[name].bundle.[hash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Name',
            template: 'template.html',
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|lib)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react'],
                    plugins: [
                        'react-hot-loader/babel',
                        'syntax-dynamic-import',
                        'transform-object-assign',
                        'transform-object-rest-spread',
                    ],
                },
            },
            {
                test: /\.jsx?/,
                exclude: /(node_modules|lib|json)/,
                loader: 'eslint-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => [require('autoprefixer')]
                        }
                    },
                    {
                        loader: 'sass-loader?sourceMap'
                    }
                ],
            },
            {
                test: /fonts.*\.(woff|woff2|ttf|eot|svg)($|\?)/,
                loader: 'url-loader?limit=25000&name=font/[name].[ext]',
            },
            {
                test: /(img|images).*\.(jpg|png|gif|svg)$/,
                loader: 'url-loader?limit=25000&name=img/[name].[ext]',
            },
            {
                test: /.*\.(json)$/,
                exclude: /node_modules/,
                loader: 'json-loader',
            },
            {
                test: /\.(html)$/,
                use: [
                    'html-loader',
                ],
            },
            {
                test: require.resolve('leaflet'),
                use: [
                    {
                        loader: 'expose-loader',
                        query: 'leaflet',
                    },
                    {
                        loader: 'expose-loader',
                        query: 'L',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['common', 'node_modules', 'img', 'js'],
    },
    node: {
        fs: 'empty',
    },
    devServer: {
        disableHostCheck: true,
        historyApiFallback: {
            index: '/',
        },
        clientLogLevel: 'warning',
    },
};
