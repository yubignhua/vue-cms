'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  //BASE_API: '"http://192.168.2.67:8005"'
  //BASE_API: '"https://biztest.chunyu.me"'
  BASE_API: '"https://devtest.chunyu.me"'
})
