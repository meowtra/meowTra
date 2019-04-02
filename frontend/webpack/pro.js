const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const AssetsPlugin = require('assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseConfig = require('./base')

const config = Object.assign({}, baseConfig, {
  mode: 'production',
  output: {
    path: path.join(__dirname, '../dist'), // 出口目录，dist文件
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
      chunkFilename: "[id].[chunkhash].css"
    }),
    new AssetsPlugin({
      filename: 'dist/assets.js',
      processOutput: assets => 'window.env="production";window.WEBPACK_ASSETS=' + JSON.stringify(assets)
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
})

module.exports = config