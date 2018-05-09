/**
 * Created by yubh on 2018/5/2.
 */
'use strict';
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
//const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const env = require('../config/test.env');

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.test.productionSourceMap,//true
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.test.productionSourceMap ? config.test.devtool : false,//devtool: '#source-map',
  output: {
    path: config.test.assetsRoot, //将编译结果发布到本项目先的 dist 目录下
    //path: config.test.expressRoot,// 将编译结果发布到本地 express 服务器   expressRoot => '/Users/cy/myTest/express/dist',
    publicPath: config.test.assetsPublicPath,//assetsPublicPath: '/',
    //filename: config.test.assetsSubDirectory+'/[name].[chunkhash].js',
    //filename: utils.assetsPath('[name].js'),
    //chunkFilename: utils.assetsPath('[name].js'),
    filename: utils.assetsPath('[name].min.[chunkhash].js'),
    chunkFilename: utils.assetsPath('[name].min.[chunkhash].js'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),

    
    
    
    
    // extract css into its own file
    new ExtractTextPlugin({
      //filename: utils.assetsPath('[name].[contenthash].css'),
      filename: utils.assetsPath('[name].css'),
      //filename: utils.assetsPath('[name].min.[contenthash].css'),
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.test.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.test.index,// index: path.resolve(__dirname, '../dist/index.html'), :输出文件的文件名称，默认为index.html，不配置就是该文件名；此外，还可以为输出文件指定目录位置
      //filename: '/Users/cy/myTest/express/dist/index.html',//将 index 文件放入本地express 目录下的 dist文件夹下
      template: 'index.html',//本地模板的文职
      inject: true,//向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同
      minify: {
        removeComments: false,
        collapseWhitespace: false,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    
    //copy custom static assets
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.test.assetsSubDirectory,//assetsSubDirectory: 'static/vue',
    //     ignore: ['.*']
    //   }
    // ])
  ]
})

if (config.test.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.test.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.test.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;
