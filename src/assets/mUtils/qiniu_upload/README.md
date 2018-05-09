# JavaScript直传七牛云组件使用方法

## 1. 背景：
* 以下的`客户端`指代`前端`。
- 开发者使用本组件可以方便的从浏览器端上传`文件`至七牛云，并对上传成功后的图片进行丰富的数据处理操作。
    * 这儿的`文件`理论上包含图片在内的所有文件类型，如音频、视频、代码文件等。
- 减轻春雨服务器的压力，数据通信发生在客户端和七牛的云主机之间，春雨服务器只返回token。
- 基于第二点，文件上传速度更快。
- 客户端对上传文件的处理更灵活，掌控更全面。

## 2. 官方文档和demo
- http://developer.qiniu.com/code/v6/sdk/javascript.html#api-reference
- http://jssdk.demo.qiniu.io/

## 3. 组件使用
**此组件对官方组件进行了封装和改造，使用上更方便。**

1. 第一步
    引入CDN文件

    ```bash
    <script src="//dn-chunyu1.qbox.me/vQwAAPrsBY2aSYkU-4881c683-5bad-4001-85a8-3cb816c2e017.js">
    ```
    `此地址以后可能会更改，变得更易读，但是此地址CDN上会保留。`
2. 第二步
    引入组件（以fis-medweb为例）

    ```bash
    <script src="/widget/qiniu_upload/qiniu_upload.js" type="text/javascript"></script>
    目标js文件中：
    var QUpload = require('/widget/qiniu_upload/qiniu_upload');
    ```
3. 第三步
    初始化uploader（请确保在执行初始化时，已经完成第一二步）
    ```bash
    var uploader = QUpload({
        uptoken_url: '', // Ajax请求upToken的Url（已封装，不需要设置）
        uptoken: '', // 可以指定固定的uptoken来覆盖从uptoken_url获取的token（一般不需要设置）

        browse_button: 'pickfiles', //上传选择的点选按钮，**必需**

        maxSize: '10mb', // 文件最大限制
        maxSize: function(file){}, //文件超过最大限制后的错误回调函数

        maxNums: 9, // 一次上传文件最大数量限制
        numsErrorCb: function(){}, // 文件数量超过最大限制后的回调函数

        // 不设置此值，默认允许图片格式文件（"jpg,png,gif,bmp,jpeg"）上传
        fileTypes: [
            {
                title: 'video', //标识
                extensions: 'flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4'
            },
            {
                title: 'audio',
                extensions: 'mp3'
            }
        ],
        typesErrorCb: function(file){}, //文件类型错误后的回调函数
        filesTypesAll: true, //默认为false，设置为true，即表示不限定文件类型

        // methods
        FilesAdded: function(up, files){
            // 文件添加进队列后,处理相关的事情
        },
        BeforeUpload: function(up, file){
            // 每个文件上传前,处理相关的事情
        },
        UploadProgress: function(up, file){
            // 每个文件上传时,处理相关的事情
            // 一般可做上传进度的显示
        },
        FileUploaded: function(up, file, info){
            // 每个文件上传完成时,处理相关的事情
        },
        UploadComplete: function(){
            //所有文件上传完毕后,处理相关的事情
        },
        Error: function(up, err, errTip){
            // 上传出错时,处理相关的事情
        }
    });
    ```

## 4. demo

https://test.chunyu.me/cooperation/wap/create_free_problem_page/?partner=chunyu_wap

## 5. QA
