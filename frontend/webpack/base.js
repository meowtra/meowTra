const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: {
    main: './src/main.js'
  },
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src')
    }
  },
  module: {
    rules: [{
      test: /\.styl$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        'css-loader', {
          loader: "postcss-loader",
          options: {
            ident: 'postcss',
            plugins: [
              require('autoprefixer')({
                'browsers': [
                  '> 1%',
                  'last 10 versions',
                  'not ie <= 8',
                  'Firefox >= 20'
                ]
              })
            ]
          }
        },
        'stylus-loader',
      ]
    }, {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env'
          ],
          plugins: [
            "transform-vue-jsx",
            '@babel/plugin-syntax-dynamic-import', ["@babel/plugin-proposal-decorators", {
              legacy: true
            }],
            '@babel/plugin-proposal-class-properties',
            "@babel/plugin-transform-runtime"
          ]
        }
      }
    }]
  },
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -20,
          chunks: "all"
        }
      }
    }
  }
}