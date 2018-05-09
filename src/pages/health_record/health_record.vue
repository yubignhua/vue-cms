<template>
    <div class="health-record">
      <el-button @click="goBack" class="hr_back" icon="el-icon-back" type="primary" plain>返回列表</el-button>
      <div style="text-align: center;margin-top: 5px;">
        <el-row>
          <el-button @click="dialogVisible1= true" size="large" icon="el-icon-upload">上传动态血压</el-button>
          <!--<input type="file" class="file-input file-input-license2" name="images" accept="image/*">-->
          <el-button @click="dialogVisible2 = true" size="medium" icon="el-icon-upload2">手动上传血压</el-button>
        </el-row>
      </div>
      <div class="my_tab" v-model="tabPosition" style="margin-bottom: 5px;">
        <div class="btn_wrapper">
          <div @click="clickTab(0)" :class="{btn_item:true,selected:sty[0]}">用户健康基本信息</div>
          <div @click="clickTab(1)" :class="{btn_item:true,selected:sty[1]}">药物记录</div>
          <div @click="clickTab(2)" :class="{btn_item:true,selected:sty[2]}">最近血压记录</div>
          <div @click="clickTab(3)" :class="{btn_item:true,selected:sty[3]}">动态血压记录</div>
          <div @click="clickTab(4)" :class="{btn_item:true,selected:sty[4]}">服务记录</div>
        </div>
      </div>
      <div class="m_content">
        <!--路由组件-->
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>

      <!--动态上传血压-->
      <div v-if="dialogVisible1">
        <el-dialog title="动态上传血压" :visible.sync="dialogVisible1" width="70%">
        <span>
          <q-upload @complete="upComplete" qClass="my-upload" :isUpload="dialogVisible1" ></q-upload>
        </span>
        </el-dialog>
      </div>

      <!--手动上传血压-->
      <el-dialog title="手动上传血压" :visible.sync="dialogVisible2" width="70%">
        <el-form :model="sendForm" :rules="rules" ref="sendForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="时间" prop="upload_time">
            <el-date-picker
              v-model="sendForm.upload_time"
              type="datetime"
              value-format="yyyy-MM-dd HH:MM:SS"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="高压" prop="high_pressure">
            <el-input type="tel" v-model.number="sendForm.high_pressure" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="低压" prop="low_pressure">
            <el-input type="tel" v-model.number="sendForm.low_pressure" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="心率" prop="heart_rate"  size="small">
            <el-input v-model="sendForm.heart_rate" size="small"></el-input>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitEditForm()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  //手动血压上传
  const UPLOAD_BP = '/cdm/user/pressure/common/upload';
  //动态血压上传
  const UP_BP = '/cdm/user/pressure/report/upload'
	import { mapGetters} from 'vuex'
  import qUpload from '../../components/qupload.vue'
	export default {
		components: {qUpload},
		data(){
			return {
        //表单检验
        rules: {
          upload_time:[{required:true,message: '请输入您的测试时间',}],
          high_pressure:[{required:true,message: '请输入您的高压',}],
          low_pressure:[{required:true,message: '请输入您的低压',}],
          heart_rate:[{required:true,message: '请输入您的心率',}],
        },
        sendForm:{
          upload_time:'',
          heart_rate:'',
          high_pressure:'',
          low_pressure:'',
          user_id:'',
        },
        dialogVisible1:false,
        dialogVisible2:false,
				index:0,
        sty:[1,0,0,0,0,0],
        url:[
        	'/cdm/cdm_cms/layout/healthRecord/edit_user_info',
          '/cdm/cdm_cms/layout/healthRecord/drug_record',
          '/cdm/cdm_cms/layout/healthRecord/recent_bp_record',
          '/cdm/cdm_cms/layout/healthRecord/ambulatory_blood',
          '/cdm/cdm_cms/layout/healthRecord/server_list',
        ],
        tabPosition: 'top',
        tabList:[
        	{des:'用户健康基本信息',index:0},
          {des:'药物记录',index:1},
          {des:'最近血压记录',index:2},
          {des:'动态血压记录',index:3},
          {des:'服务记录',index:4}
          ],
      }
		},
    computed:{
      ...mapGetters(["patientId"]),

    },
		methods: {
			goBack(){
        this.$router.push({ path: '/cdm/cdm_cms/layout/health_manage'})
      },
      clickTab(index){
				//alert(this.url[index])
        this.index = index;
        this.sty = [0,0,0,0,0,0];
				this.sty[index] = 1;
				this.$router.push({path:this.url[index]})
      },
      /**
       * 动态血压上传成功回调
       */
      upComplete(res){
      	console.log('res.url===',res.url);
      	this.updateBP(res.url);
      },

      /**
       * 动态血压上传
       */
      async updateBP(url){
      	const result = await this.request.post(UP_BP,{url,user_id:this.patientId});
      	if(result.data.error_code === 0){
          this.$notify({
            type: 'success',
            title:'成功',
            message:'上传服务成功',
          });
        } else{
          this.$notify({
            type: 'success',
            title:'成功',
            message:'上传服务失败请重新上传',
          });
        }


      },





      /**
       * 初始化状态
       */
      initSendForm(){
      	this.sendForm = {
          upload_time:'',
          heart_rate:'',
          high_pressure:'',
          low_pressure:'',
          user_id:'',
        }
      },
      /**
       * 提交手动上传血压
       */
      async submitEditForm(){
        let that = this;
        const valid = await new Promise((resolve, reject) => {
          that.$refs.sendForm.validate( valid => valid ? resolve(valid) : reject(valid))
        });
        if(valid){
          that.sendForm.user_id = this.patientId;
          const res = await this.request.post(UPLOAD_BP,that.sendForm);
          that.dialogVisible2 = false;
          if(res.data.error_code===0){
            this.initSendForm();
            that.$notify({
              type: 'success',
              title:'成功',
              message:'血压上传成功',
            });
          }else {
            that.$notify.error({
              title  : '错误',
              message: res.data.error_msg
            })
          }

        }
      },

    },

    beforeRouteEnter (to, from, next) {
      next(vm=>{
        vm.sty = [0,0,0,0,0,0];
        if(to.path === vm.url[vm.index])
          vm.sty[vm.index] = 1
      });


    }
	};
</script>
<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/style/mixin.scss';
    .health-record{
      width:100%;
      //margin-left: 20px;
      //margin-top: 20px;
      .hr_back{
        position: absolute;
        top:20px;
        left:30px;
        z-index: 100;
      }
      .my_tab{
        width:100%;
        text-align: center;
        margin-top:5px;
        .btn_wrapper{
          display: inline-block;
          & .btn_item:nth-child(1){
            border:1px solid #dcdfe6;
          }
          .btn_item{
            float: left;
            padding:10px 15px;
            color: #606266;
            border:1px solid #dcdfe6;
            border-left:none;
            background: #fff;
            cursor: pointer;
          }
          .btn_item.selected{
            color: #fff;
            background-color: #409EFF;
            border-color: #409EFF;
          }
        }
      }
      .m_content {
        position: absolute;
        background: #fff;
        bottom: 0;
        top: 100px;
        left: 10px;
        right: 0;
      }

    }


</style>
