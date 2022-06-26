// @ts-check

const { ESBuildMinifyPlugin } = require('esbuild-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = (_, argv) => {
    const dev = argv.mode == 'development'

    return config(dev)
}

/**
 * @type { (dev: boolean) => import('webpack').Configuration }
 */

const config = dev => ({
    mode: dev ? 'development' : 'production',
    entry: './src/main.tsx',
    output: {
        filename: 'assets/[contenthash].js',
        path: path.resolve(__dirname, 'public'),
        clean: true,
    },
    target: ['web', 'es2020'],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'ts',
                    target: 'es2020',
                },
            },
            {
                test: /\.tsx$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                    target: 'es2020',
                },
            },
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            publicPath: './',
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[contenthash].css',
        }),
    ],
    optimization: {
        minimizer: [
            new ESBuildMinifyPlugin({
                target: 'es2020',
                css: true,
            }),
        ],
        minimize: !dev,
        runtimeChunk: 'single',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000,
        static: true,
        hot: true,
        historyApiFallback: true,
    },
    devtool: dev ? 'source-map' : false,
})
