<template>
  <div class="upload">

    <div class="container">
      <div ref="file_name" class="url_box file_name"></div>
      <el-button-group style="float: right;">
        <div class="c_item"><el-button type="primary" @click="startUpload">上传<i class="el-icon-upload el-icon--right"></i></el-button></div>
        <div class="c_item"><el-button type="primary" @click="selectFile">文件<i class="el-icon-plus el-icon--right"></i></el-button></div>
        <div class="c_item"><el-button type="primary" @click="clearFile">删除<i class="el-icon-delete el-icon--right"></i></el-button></div>
      </el-button-group>
      <div class="img-container" :style="{ 'background-image': 'url(' + imgUrl3 + ')', 'background-size': '100% 100%'}">
        <input ref='my_upload_input' type="file" :class="['file-input',compCls?'compCls':'']" name="images" :accept="acceptType">
      </div>
    </div>
    <el-progress :percentage="percent" v-show="isShowProgress"></el-progress>
  </div>
</template>

<script>
	//import {MixinSetInterval,MixinRouterState} from '../../assets/mUtils/mixin.js';
	//import { mapState,mapMutations,mapActions } from 'vuex'
  import Qupload from '../assets/mUtils/qiniu_upload/qiniu_upload_2'
  import { Message } from 'element-ui'

	export default {
    name: 'q_upload',
		props: {
    	acceptType:{
    		type:String,
        default:'application/pdf'
      },
      qClass:{
        type:String,
      },
      maxFilesSize: {
        default: 10 * 1024 * 1024,
      },
      maxNums: {
        default: 1
      },
      autoStart: {
        default: false
      },
      myLoginUrl: {
        default: '/cdm/cdm_mobile/login'
      },
    },

		data(){
			return {
        imgUrl3: 'http//media2.chunyuyisheng.com/@/media/images/2018/04/04/a41f/a5738479079b_w184_h184_.png',
        compCls:this.qClass,
        percent:0,
        isShowProgress:false
      }
		},
		methods: {
      upload() {
        let data = [],that = this;
        this.qupload = new Qupload({
          btn: this.$refs.my_upload_input,
          max_file_size: this.maxFilesSize,
          nums: this.maxNums,
          auto_start:this.autoStart,
          loginUrl:this.myLoginUrl,
          before(mfile){

          },
          next: function(res) {
          	console.log('next:::',res.total.percent);
            that.percent = res.total.percent;
          },
          complete(res) {
            if (res.success) {
              data = { url: res.img_url };
              that.$emit('complete',data);
              that.isShowProgress = false;
              $(that.$refs.file_name).empty() ;
              Message({
                message: '上传七牛成功',
                type: 'success',
                duration: 2 * 1000
              });
              //$('.file_name').append('<span style="color: brown;">上传七牛成功</span>')
            }else{
              Message({
                message: '上传七牛失败',
                type: 'error',
                duration: 2 * 1000
              });
            }
          },
          error(err){
            let tips = '';
            switch (err.type) {
              case 'numsError':tips = '一次最多上传' + this.nums + '张图片';break;
              case 'sizeError':tips = '图片最大不超过10M';break;
              default:tips = err.message;break
            }
            console.log(':::::::err::::::',err)
            Message({
              message: tips + err,
              type: 'error',
              duration: 5 * 1000
            });
          }
        });
      },

      clearFile(){
        this.isShowProgress = false;
        $(this.$refs.file_name).empty() ;

      },

      selectFile(){
      	this.$refs.my_upload_input.click();
      },

      /**
       * 上传按钮 开始上传
       */
      startUpload(){
      	if($(this.$refs.file_name).html() == ''){
      		console.log('wuxiao')
      		return
        }
      	if (this.qupload.subscribe) {
          this.isShowProgress = true;
          this.qupload.subscribe();
        }
      },
    },

		mounted(){
		  this.upload(this.compCls);
    },
    //computed: {},
    //created () {},
		//updated () {},
	};
</script>
<style lang="scss" rel="stylesheet/scss">
    @import '../assets/style/mixin.scss';
    .upload{
      padding: 20px 20px;
      .container{
        border:solid 1px #f4f4f5;
        height:32px;
        .url_box{
          float: left;
          height:100%;
          line-height: 32px;
          padding-left: 15px;
        }
        .c_item{
          float: right;
        }
        .c_url{
          float: left;
          width: 70%;
        }
      }


      .img-container{
        display: none;

        .file-input{
          opacity: 0;
          width:100%;
          height:100%;
        }
      }
      .mfile{
        margin-top:10px;
        height:100px;
      }
    }
</style>
