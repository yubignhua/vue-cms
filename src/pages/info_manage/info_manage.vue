<template>
    <div class="info_manage">
      <el-card class="box-card-top">
        <div class="top_search">
          <el-form :inline="true" :model="formInline" ref="formName" onsubmit="return false" class="demo-form-inline">
            <el-form-item  label="手机" prop="cellphone" :rules="[{ type: 'number', message: '手机号须为数字',trigger:'change'}]">
              <el-input type="tel" v-model.number="formInline.cellphone" v-on:keyup.enter.native="onSearchSubmit('formName')" placeholder="手机" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="small" @click="onSearchSubmit('formName')">查询
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户基本信息</span>
        </div>
        <div class="text item">姓名: {{editForm.user_name}}</div>
        <div class="text item">性别: {{!editForm.user_sex?"":editForm.user_sex==="m"?"男":"女"}}</div>
        <div v-if="editForm.user_age" class="text item">年龄: {{editForm.user_age}}</div>
      </el-card>


      <el-card class="box-card-left">
        <div slot="header" class="clearfix">
          <span>血压健康相关信息</span>
        </div>
        <el-form :model="editForm" ref="editForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="有效期" prop="end_time">
            <el-date-picker value-format="yyyy-MM-dd" v-model="editForm.end_time" type="date" placeholder="选择日期" />
          </el-form-item>

          <!--<el-form-item label="有效期 :" prop="valid_period"  size="small">-->
            <!--<el-input v-model="editForm.valid_period" size="small"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="设备SN :" prop="device_sn"  size="small">
            <el-input v-model="editForm.device_sn" size="small"></el-input>
          </el-form-item>
          <el-form-item label="专属医生 :" prop="doctor_name"  size="small">
            <el-select v-model="editForm.doctor_id" placeholder="请选择医生">
              <el-option v-for="item in doctorList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="健康助理 :" prop="assistant_name"  size="small">
            <el-select v-model="editForm.assistant_id" placeholder="请选择医助">
              <el-option v-for="item in assistants" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveInfo()">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
	//import {MixinSetInterval,MixinRouterState} from '../../assets/mUtils/mixin.js';
	import { mapState,mapMutations,mapActions,mapGetters } from 'vuex'


	export default {
		//components: {Toast, XHeader,},
		//mixins: [MixinSetInterval, MixinRouterState],
		data(){
			return {
        formInline : {
          cellphone  : '',
        },
        // 购买用户表单状态
        editForm:{
          end_time:'',
          device_sn:'',
          user_name: '',
          user_sex:'',
          user_age:'',
          assistant_id:'',
          doctor_id:''

        },
        doctorList: [],
        assistants:[],

      }
		},
		methods: {
      /**
       * 提交查询用户信息
       * @param formName
       */
      async onSearchSubmit() {
        if(this.formInline.cellphone === ''){
          this.$message({
            message: '请输入查询内容',
            type: 'warning'
          });
        } else{
          //this.searchBaseInfo(this.formInline);
          const result = await this.request.get('/cdm/service/search/detail',{params:{cellphone:this.formInline.cellphone}});
          console.log('result:::',result);
          this.editForm = result.data.service_info
        }
      },

      async saveInfo(){
      	let opt = {};
      	opt.assistant_id = this.editForm.assistant_id;
      	opt.doctor_id = this.editForm.doctor_id;
      	opt.device_sn = this.editForm.device_sn;
      	opt.end_time = this.editForm.end_time;
      	opt.service_id = this.editForm.service_id;

      	const result = await this.request.post('/cdm/service/edit',opt);
      	if(result.data.error_code === 0){
      		this.$notify.success({
      			message:'保存成功',
            title:'成功'
          })
        }else{
          this.$notify.error({
            message: result.data.error.msg,
            title:'失败'
          })
        }

      }




    },
		computed: {
      ...mapGetters(["assistentList","docList"]),
    },

		mounted(){

			setTimeout(()=>{
        this.doctorList = this.docList.map(item => {
          return { value: item.user_id, label: item.name };
    });


      this.assistants = this.assistentList.map(item => {
          return { value: item.user_id, label: item.name };
    });
      },1000)

    },

	};
</script>
<style lang="scss" rel="stylesheet/scss">
     @import '../../assets/style/mixin.scss';
    .info_manage{
      width: 100%;
      background: #ffffff;
      position: absolute;
      top: 5px;
      left: 5px;
      bottom: 0;
      right: 0;
      .text {
        font-size: 14px;
      }

      .item {
        margin: 18px 0;
        float: left;
        text-align: left;
        flex: 1;
      }
      .box-card-top{
        width: 80%;
        margin-top:20px;
        margin-left:40px;
        .el-card__body{
          padding:10px 20px;
        }
      }
      .box-card {
        width: 80%;
        margin-top:20px;
        margin-left:40px;
        .el-card__body{
          display: flex;
          justify-content: space-around;
          align-content: center;
          .el-card__body{
            padding:10px 20px;
          }
        }
      }
      .box-card-left{
        width: 40%;
        margin-top:20px;
        margin-left:40px;
        .el-card__body{
          display: flex;
          justify-content: flex-start;
          align-content: center;
          .el-card__body{
            padding:10px 20px;
          }
        }
      }
    }

</style>


