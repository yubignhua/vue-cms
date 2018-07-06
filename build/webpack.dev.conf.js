'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config');//// 基本配置的参数
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// html-webpack-plugin用于将webpack编译打包后的产品文件注入到html模板中
// 即在index.html里面加上<link>和<script>标签引用webpack打包后的文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// friendly-errors-webpack-plugin用于更友好地输出webpack的警告、错误等信息
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// 自动检索下一个可用端口
const portfinder = require('portfinder')
const chalk = require('chalk');

const HOST = process.env.HOST;
// 读取系统环境变量的port
const PORT = process.env.PORT && Number(process.env.PORT)

console.log(chalk.blue('dev.env') + ' World' + chalk.red(require('../config/dev.env')));


//console.log('dev.env',require('../config/dev.env'))
console.log('process.HOST',process.env.HOST)
console.log('process.PORT',process.env.PORT)
console.log('process.env',process.env)



const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 对一些独立的css文件以及它的预处理文件做一个编译
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  devServer: {
    clientLogLevel: 'warning',//// console 控制台显示的消息，可能的值有 none, error, warning 或者 info
    historyApiFallback: true,
    hot: true,// 开启热模块加载
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: {
        '/cyhospital/*': {
        //target: 'http://10.9.91.246:8080/cyhospital/weihospital/yanda/weiWangZhanIndex/?is_json=1',
        target: 'http://10.9.91.246:8080/',
        changeOrigin: true,
        secure: false
      },
    },
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {//// 启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改
      poll: config.dev.poll,//// 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。默认为false
    }
  },
  plugins: [
    //声明环境变量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')//development
    }),

    //声明全局方法
    new webpack.ProvidePlugin({
      Axios: "axios",
      Vue: "vue",
    }),
    /*模块热替换它允许在运行时更新各种模块，而无需进行完全刷新*/
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),// 跳过编译时出错的代码并记录下来，主要作用是使编译后运行时的包不出错
    new HtmlWebpackPlugin({
      filename: 'index.html',// 指定编译后生成的html文件名
      template: 'index.html', // 需要处理的模板
      // 打包过程中输出的js、css的路径添加到html文件中
      // css文件插入到head中
      // js文件插入到body中，可能的选项有 true, 'head', 'body', false
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;// 获取当前设定的端口
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests  发布新的端口，对于e2e测试
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
