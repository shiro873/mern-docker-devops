const webpack = require('webpack');
const ejsWebpackPlugin = require('ejs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  plugins: [
    new ejsWebpackPlugin({
      viewsDir: './src/views',
      distDir: 'dist'
    })
  ]
};