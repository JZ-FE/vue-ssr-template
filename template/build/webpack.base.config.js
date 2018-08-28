const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const NODE_ENV = process.env.NODE_ENV || 'development'
const isProd = NODE_ENV === 'production'

module.exports = {
  mode: NODE_ENV,
  devtool: isProd
    ? '#source-map'
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist2'),
    publicPath: '/{{ name }}/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public'),
      'components': path.resolve(__dirname, '../src/components'),
      'plugins': path.resolve(__dirname, '../src/plugins'),
      'helpers': path.resolve(__dirname, '../src/helpers'),
      'utils': path.resolve(__dirname, '../src/helpers/utils'),
      'base': path.resolve(__dirname, '../src/sass/base/_base.scss')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {{#lint}}
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src/')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {{/lint}}
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.scss?$/,
        oneOf: [
          {
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: { minimize: isProd }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    require('autoprefixer')({
                      browsers: ['last 3 versions', 'iOS >= 8', 'Android >= 4']
                    })
                  ]
                }
              },
              'sass-loader'
            ]
          }
        ]
      },
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'common.[chunkhash].css'
    }),
    ... isProd ? [] : [ new FriendlyErrorsPlugin() ]
  ]
}
