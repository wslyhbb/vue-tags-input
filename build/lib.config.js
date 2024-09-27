'use strict';
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const resolve = src => path.resolve(__dirname, src);

module.exports = {
  mode: 'production',
  entry: [resolve('../vue-tags-input/publish.js')],
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    filename: 'vue-tags-input.js',
    library: 'vueTagsInput',
    libraryTarget: 'umd',
  },
  externals:{
    vue: 'vue',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
            presets: ['@babel/preset-env']
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')(),
                ]
              },
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        type: 'asset'
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': '@vue/runtime-dom',
    },
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
  },
};
