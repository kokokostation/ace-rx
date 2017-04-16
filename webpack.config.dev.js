/* eslint-disable */
/* global __dirname */
/* generated by unstuck-webpack */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dir_js = path.resolve(__dirname, 'src/app');
const dir_css = path.resolve(__dirname, 'src/css');
const dir_build = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    app : path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: dir_build,
    filename: 'bundle.dev.js',
    publicPath: 'http://localhost:8080/'
  },
  resolve: {
    modules: ['node_modules', dir_js],
  },
  devServer: {
    contentBase: dir_build,
    inline: true
  },
  devtool: 'source-map',
  stats: {
    colors: true,
    chunkModules: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  
  module: {
    rules: [
      {
        loader: 'file-loader?name=assets/[name].[ext]',
        test: /\.png($|\?)|\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/
      },
      {
        loader: 'babel-loader',
        test: /\.js($|\?)|\.jsx($|\?)/,
        exclude: /node_modules/,
        options: {
          presets : ['es2015', 'react']
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  }
}
