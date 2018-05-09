# vue_cdm

> 用 vue + vue-router + vuex + webpack + vux-ui + mock + es6 搭建的慢性病管理移动端项目

## 使用的技术栈:

- [vue](https://cn.vuejs.org/)
- [vuex](https://vuex.vuejs.org/zh-cn/getting-started.html)
- [vue-router](https://router.vuejs.org/zh-cn/)
- [vux(ui组件库)](https://ant.design/docs/react/introduce-cn)
- [webpack(打包工具)](https://webpack.js.org/guides/)

## Build Setup

``` bash
# 引入项目所需依赖
npm install

# 在localhost:8080 本地启动项目 用于本地开发
npm run dev


布到biztest测试机:
```shell
sh publish_test.sh --biz
```


# 用minification 打包线上文件
npm run build

# build for production and view the bundle analyzer report
npm run build --report


# 打包测试文件 到 dist 目录
npm test
```

### build/

该目录包括了本工程实际起作用的配置，既包括开发环境也包括生产环境的构建。通常，你不需要修改这个目录下面的文件
除非你想定制webpack的loader，这种情况下，你可能需要阅读下`build/webpack.base.conf.js`下面的代码


### config/index.js

该文件主要是提供了很多通用配置的选项，用于构建的时候引用。
查看 [API Proxying During Development](https://vuejs-templates.github.io/webpack/proxy.html)
和 [Integrating with Backend Framework](https://vuejs-templates.github.io/webpack/backend.html)
获取更详细的解释。


### src/

该目录是本工程大部分业务代码所在的地方。如何组织该目录内部的代码文件结构，很大程度上取决于开发者本身。如果使用VUX，
可以查看下[项目结构](https://vuejs-templates.github.io/webpack/structure.html)这篇文章获取参考






