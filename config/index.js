'use strict'
const path = require('path')
module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8086, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'eval-source-map',
    cacheBusting: true,
    cssSourceMap: false,
  },
  test:{
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '/cdm/', //为 测试服的公共路径
    assetsSubDirectory: 'static/vue_cdm',


    expressRoot:'/Users/cy/myTest/express/dist', //存放本机 express 服务下
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    index: path.resolve(__dirname, '../dist/index.html'), // Template for index.html
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '//dn-chunyu.qbox.me/@/',
    //assetsPublicPath: '/cdm/', //为 测试服的公共路径
    assetsSubDirectory: 'static/vue_cdm_cms',
    productionSourceMap: false,//是否生成.map 文件
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    index: path.resolve(__dirname, '../dist/index.html'),

  }
}
