'use strict'
let webpack = require('webpack')
let WebpackDevServer = require('webpack-dev-server')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let path = require('path')

let compiler = webpack({
  watch: true,
  cache: true,
  debug: true,
  devtool: 'cheap-source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.js$/,
        loader: 'babel',
      }
    ],
  },
  babel: {
    presets: ['stage-1', 'es2015'],
    // plugins: ['transform-runtime'],
    // due to such error:
    // http://stackoverflow.com/questions/29576341/what-does-the-code-generator-has-deoptimised-the-styling-of-some-file-as-it-e
    compact: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'test/index.html',
      template: './src/test/index.tmpl',
      inject: false,
      favicon: false,
      hash: false,
    }),
  ],
})

let server = new WebpackDevServer(compiler, {
  contentBase: './dist',
  colors: true,
  hot: true,
  // inline: true,
})

server.listen(9090, 'localhost')
