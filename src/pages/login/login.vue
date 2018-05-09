<template>
    <div class="login">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="title">慢性病管理系统</span>
        </div>
        <div class="text item">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="account">
              <el-input v-model.account="ruleForm2.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>

        </div>
      </el-card>
    </div>
</template>

<script>
	import {mapActions} from 'vuex'
  import {validPhone} from '../../assets/mUtils/validate'
  import Cookies from 'js-cookie'

	export default {
    data() {
      return {
        ruleForm2: {
          account:Cookies.get('mPhone')||'',
          pass: Cookies.get('pass')||'',
        },
        rules2: {
          account: [
            {message: '请填写正确的手机号码',trigger: 'blur',validator:validPhone},
          ]
        }
      };
    },
    methods: {
      ...mapActions(['getUerInfo']),
      /**
       * 登录方法
       * @param formName
       */
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate(valid => {
          if (valid) {
          	//console.log('that.ruleForm2',that.ruleForm2)
            Cookies.set('mPhone', this.ruleForm2.account);
            Cookies.set('pass', this.ruleForm2.pass);
            that.getUerInfo(that.ruleForm2).then((res)=>{
            	console.log("res:::",res);
            	if(res.error_code === 0){
                //登录成后的跳转
                that.$router.push({path:'/cdm/cdm_cms/layout/base_info'})
              }else{
                that.$notify.error({
                  title  : '错误',
                  message: res.error_msg
                })
              }

            }).catch( err =>{
            	console.log(err)
            })
          }
        })
      },
      /**
       * 重置
       * @param formName
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
    	console.log('colllkie;::',document.cookie)
    },

	};
</script>
<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/style/mixin.scss';
    .login{
      position: absolute;
      width: 100%;
      top:0;
      bottom:0;
     .box-card{
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -75%);
       .el-card__header{
         text-align: center;
       }
       .title{
         font-size:20px;
         color: #666;
       }

     }
      .text {
        font-size: 14px;
      }

      .item {
        margin-bottom: 18px;
      }

      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }
      .clearfix:after {
        clear: both
      }

      .box-card {
        width: 480px;
      }
    }


</style>
