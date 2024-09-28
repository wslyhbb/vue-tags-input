'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

const resolve = src => path.resolve(__dirname, src);
const port = 3000;

module.exports = {
  mode,
  entry: ['@babel/polyfill', resolve('../docs/main.js')],
  output: {
    path: resolve('../docs-dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.demo\./,
        type: 'asset/source',
      },
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
        exclude: /(node_modules|\.demo\.)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        exclude: /\.demo\./,
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
        test: /\.(woff|woff2|eot|ttf|mp3|mp4|webm)$/,
        type: 'asset/resource',
        generator: {
          filename: '[path][name]-[hash].[ext]'
        },
      },
      {
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        type: 'asset/resource'
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: resolve('../docs/.htaccess') }]
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('../docs/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
      },
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    }),
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@components': resolve('../docs/components'),
      '@wslyhbb/vue3-tags-input': resolve('../vue-tags-input/vue-tags-input.vue'),
      '@tag-input': resolve('../vue-tags-input/tag-input.vue'),
      'colors': resolve('../docs/colors.scss'),
      'vue': '@vue/runtime-dom',
    },
  },
  devServer: {
    historyApiFallback: true,
    port,
    host: '0.0.0.0',
  },
  performance: {
    hints: false,
  },
  devtool: 'eval-source-map',
  optimization: {
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: mode === 'production' ? {
            plugins: [
              ['mozjpeg', {
                progressive: true,
                quality: 75,
              }],
              ['optipng', {
                enabled: false,
              }],
              ['pngquant', {
                quality: '75-90',
                speed: 4,
              }]
            ],
          } : { disable: true }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

if (mode === 'production') {
  module.exports.devtool = 'source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.LoaderOptionsPlugin({ minimize: true }),
  ]);
}

if (process.env.ANALYZE === 'true') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new BundleAnalyzerPlugin(),
  ]);
}
