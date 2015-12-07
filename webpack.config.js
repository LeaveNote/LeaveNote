module.exports = {
  cache: true,
  entry: "./src/main.js",
  output: {
    path: './dist',
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
    presets: ["stage-1", "es2015"],
    plugins: ['transform-runtime'],
  },
}
