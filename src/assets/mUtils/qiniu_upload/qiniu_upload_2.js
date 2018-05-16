/**
 * This is a simple file upload plugin depends on HTML5 and qiniu js-sdk.
 * You can use it to mordern browser.
 * js-sdk: https://github.com/qiniu/js-sdk/
 *
 * @version: 1.0
 * @date: 2018-04-04
 * @author tianxi
 **/
//import request from '../../mUtils/request'
import qiniu from './qiniu.min';
//import PDFObject from '../pdfobject.min';
//var PDFObject = require('../pdfobject.min').PDFObject;
//console.log('PDFObject****',PDFObject);
function Qupload(options) {
    var defaults = {
        max_file_size: 15 * 1024 * 1024,            // 文件最大尺寸
        loginUrl: '',                               // 未获取到token跳转到登陆页面
        btn: '',                                    // 上传input选择器
        nums: '10',                                 // 每次上传最多文件个数
        auto_start: true,                           // 选择文件后是否自动上传,手动上传一次只能选择一个
        config: {
            useCdnDomain: true,                     // 是否使用 cdn 加速域名
            disableStatisticsReport: false,         // 是否禁用日志报告
            retryCount: 1                           // 上传自动重试次数
        },
        putExtra: {
            fname: '',
            params: {},
            mimeType: ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp', 'image/gif','application/pdf'] // 允许上传文件类型为,null时表示不对文件类型限制
        },
        before: function(res) {
            // console.log(res)
        },
        next: function(res) {                       // 上传过程，可用于处理上传进度
            // console.log(res)
        },
        complete: function(res) {                   // 上传完成
            // \\\console.log(res)
        },
        error: function() {                         // 资源受限或上传失败
            // console.log(err.message)
        },
    }
    options.mimeType ? defaults.putExtra.mimeType = options.mimeType : '';
    $.extend(true, this, defaults, options);

    this.target = $(this.btn) || ''; // 目标元素
    this.token = null;
    //this.token = "yOzXJLo4fTbpHAjrvAN3iCWaUsTE1hQ9CZuxFlQG:K69edyy9Z5-P8vjXTNtaqPKjj6U=:eyJzY29wZSI6Im5ld3MtY2h1bnl1IiwiY2FsbGJhY2tGZXRjaEtleSI6MSwiZGVhZGxpbmUiOjE1MjU2ODI0NzYsImNhbGxiYWNrQm9keSI6ImtleT0kKGtleSkmdz0kKGltYWdlSW5mby53aWR0aCkmaD0kKGltYWdlSW5mby5oZWlnaHQpJmV4dD0kKGV4dCkmbWltZVR5cGU9JChtaW1lVHlwZSkiLCJjYWxsYmFja1VybCI6Imh0dHA6Ly9iaXp0ZXN0LmNodW55dS5tZS9maWxlcy9xaW5pdV9jYWxsYmFjay8ifQ==";
    this.observable = null;
    this.subscription = null;
    this.hasToken = false;
    this.needUpload = false;
    this.needLogin = false;
    this.init()
}

Qupload.prototype = {
    init: function() {
        if (this.token) {
            this.hasToken = true
        } else {
            this._getToken()
        }
      this.bindEvent()
    },
    //为 input file 标签绑定change 事件
    bindEvent: function() {
      var that = this;
      that.target.bind('change', function(event) {
        that.uploadEvent(event)
        })
    },
    
    //获取 token 成功之后  上传方法
    uploadEvent: function(e) {
        var files = e.target.files;
        if (!files && !files.length || !this.loginCheck()) return;
        for (var i = 0; i < files.length; i++) {
              var file = files[i],
                url = this.getObjectURL(file),
                key = file.name;
              if(url.indexOf('pdf')!=-1){
                this.target.parent().siblings('.mfile').attr('src',url);
              }
          this.target.parent().siblings('.file_name').html(key);
          //PDFObject.embed(url,this.target.parent().siblings("#example1") );
          if (!this.validateFile(files, file)) return;
            this.upload(file, key)
        }
    },
    //获取上传文件的 url
    getObjectURL : function(file){
      var url = null;
      if (window.createObjectURL != undefined){ // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined){ // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined){ // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    //判断是否登录
    loginCheck : function(){
      // 请求完token后,未登陆处理
      if (this.needLogin){
        if (this.loginUrl){
          window.location.href = this.loginUrl
        } else{
          this.error({
            type : 'internalError',
            message : 'upload_token获取失败，请登陆后重试'
          })
        }
        return false
      }
      // 未获取到token，等待获取token
      if (!this.hasToken){
        this.needUpload = true;
        return false
      }
      return true
    },
     //校验
    validateFile: function(files, file) {
        // 文件总数超出
        if (files.length > Number(this.nums)) {
            this.error({
                type: 'numsError',
                message: '一次最多上传' + this.nums + '张图片'
            });
            return false
        }
        // 单个文件大小超出
        if (file.size > this.max_file_size) {
            this.error({
                type: 'sizeError',
                message: '图片最大不超过15M'
            });
            return false
        }
        // 文件类型错误
        var typeMatch = false;
        this.putExtra.mimeType && this.putExtra.mimeType.forEach(function(element, index) {
            if (file.type === element) {
                typeMatch = true;
                return false
            }
        })
        if (!typeMatch) {
            this.error({
                type: 'typeError',
                message: '图片上传类型错误'
            });
            return false
        }

        return true
    },
    
    //执行上传七牛
    upload: function(file, key) {
        var URL = window.URL || window.webkitURL || window.mozURL
        file.url = URL.createObjectURL(file)
        this.before({
            file: file
        });
        this.key = key;
        //this.putExtra.fname = key;
        var observable = qiniu.upload(file, key, this.token, this.putExtra, this.config);
        // 手动控制上传,外部可访问observable
        if (!this.auto_start) {
            this.observable = observable
        } else {
          // 订阅上传
            this.subscribe(observable,key)
        }
    },
    // 订阅，bind改变外部事件作用域，确保在同一作用域下
    subscribe: function(observable) {
        // 手动控制上传，外部可访问subscription
        if (!this.auto_start) {
            this.subscription = this.observable.subscribe(this.next.bind(this), this.error.bind(this), this.complete.bind(this,this.key))
        } else {
            observable.subscribe(this.next.bind(this), this.error.bind(this), this.complete.bind(this,this.key))
        }
    },
    // 取消订阅
    unsubscribe: function() {
        this.subscription && this.subscription.unsubscribe()
    },
    _getToken: function() {
        var that = this
        $.ajax({
            url: '/files/upload_token/',
            success: function(res) {
                if (!res.success) return
                that.hasToken = true
                that.token = res.token
            },
            error: function(res) {
                that.needLogin = true
            },
            complete: function() {
                if (that.needUpload) that.uploadEvent()
            }
        })
    }
}

export default Qupload
