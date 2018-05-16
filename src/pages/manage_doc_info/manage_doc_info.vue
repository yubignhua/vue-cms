<template>
  <div class="user-base-info">

    <el-main>
      <!--头部搜索表单------------>
      <div class="top_search">
        <el-form :inline="true" :model="formInline" ref="formName" class="demo-form-inline" onsubmit="return false" style="float: left;margin-left: 20px;">
          <el-form-item label="">
            <el-input v-model="formInline.query" v-on:keyup.enter.native="onSearchSubmit('formName')"  placeholder="请输入您的查找内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="onSearchSubmit('formName')">查询</el-button>
            <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogFormVisible = true">添加医生</el-button>
          </el-form-item>
        </el-form>

      </div>
      <!--表格数据------------>
      <div class="table_container" style="margin-top: 20px;">
        <el-table
          stripe
          v-loading="loading"
          :data="tableData"
          style="width:100%;"
          :max-height="tableHeight">
          <el-table-column
            fixed
            prop="name"
            label="姓名"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="user_id"
            label="医生id"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="cellphone"
            label="手机号"
            min-width="50">
          </el-table-column>

          <el-table-column
            prop="title"
            label="头衔"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="education_background"
            label="教育背景"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="achievement"
            label="学术成果"
            min-width="50">
          </el-table-column>
          <el-table-column prop="image" label="照片" width="50">
            <template slot-scope="scope">
              <img :src="scope.row.image" class="doc_avatar" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="hospital_name"
            label="医院名称"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="clinic_name"
            label="科室"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="hospital_level"
            label="医院级别"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="good_at"
            label="专业领域"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="hospital_description"
            label="医院介绍"
            min-width="100">
          </el-table-column>
          <el-table-column prop="service_type" label="服务方向" min-width="50">
            <template slot-scope="scope">
              {{scope.row.service_type===1?"血压服务":"血糖服务"}}
            </template>
          </el-table-column>

        </el-table>
      </div>
    </el-main>
    <!--footer------------>
    <el-footer style="background: white;border-top: solid 1px #f4f4f4;">
      <div class="show_num">显示第 <span>{{getCurPage}}</span> 到第 <span>{{tableDataSize+getCurPage-1}}</span> 条记录,总共 <span>{{allPageNum}}</span> 条记录</div>
      <el-pagination background layout="prev, pager, next" :current-page="curPage" :page-size="pagesize" @current-change="handleCurrentChange" :total="allPageNum"></el-pagination>
    </el-footer>

    <!--新增用户弹窗-->
    <el-dialog title="新增医生" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
        <el-form-item label="医生ID" prop="doctorId"  size="small">
          <el-input v-model="ruleForm.doctor_id" size="small"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确认添加</el-button>
      </div>
    </el-dialog>

    </el-dialog>

  </div>
</template>

<script>
  //import {MixinSetInterval,MixinRouterState} from '../../assets/mUtils/mixin.js';

  const ADD_DOC = '/cdm/doctor/create';//添加医生
  import {mapState,mapActions } from 'vuex';
  import { Loading } from 'element-ui';
  import {validPhone} from '../../assets/mUtils/validate'

  export default {
    data() {
      return {
        tableHeight:$('.table_container').height(),
        pagesize:20,
        formInline : {
          query  : '',
          curPage:1,
        },
        //新增用户表单状态
        ruleForm: {
          doctor_id:''
        },
        //表单检验
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 40, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请填写正确的手机号码',trigger: 'blur',validator:validPhone},
            { type: 'number', message: '电话必须为数字值',trigger: 'blur'},
          ],
        },
        //新增用户弹窗开关
        dialogFormVisible: false,
        //loading 开关
        loading:true,
      };
    },

    computed:{
      ...mapState('manageDoc',{
        //列表数据
        tableData: state => state.userInfoList,
        tableDataSize:state=>state.userInfoList.length,
        //当前页数
        curPage: state => state.curPage,
        allPageNum:state => state.allPageNum,
        countPerPage:state=>state.countPerPage
      }),
      getCurPage(){
        return (this.curPage-1)*20+1
      },
    },

    methods: {
      ...mapActions('manageDoc',[
        'searchBaseInfo',//查询用户信息
      ]),
      /**
       * 提交查询用户信息
       * @param formName
       */
      async onSearchSubmit() {
        this.loading = true;
        this.getDocList(this.formInline);

      },
      /**
       * 添加医生
       * @param formName
       */
      async submitForm(formName) {
        //console.log(this.ruleForm);
        var that = this;
        const valid =  await new Promise((resolve,reject)=>{
          that.$refs[formName].validate( valid => valid?resolve(valid):reject(valid));
        });
        if(valid){
        	console.log('=======',this.ruleForm);
          const res = await this.request.post(ADD_DOC,this.ruleForm);
          this.dialogFormVisible = false;
          if(res.data.error_code === 0){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            if(that.curPage === 1){
              that.formInline.curPage = 1;
              this.loading = true;
              this.getDocList(this.formInline);
            }
          }else {
            that.$notify.error({
              title  : '错误',
              message: res.data.error_msg
            })
          }
        }

      },
      /**
       * 分页回调方法
       * @param value
       */
      handleCurrentChange(value){
      	let that = this;
        this.loading = true;
        this.formInline.curPage = value;
        this.getDocList(this.formInline);
      },

      /**
       * 获取查询医生列表
       * @param opts
       */
      getDocList(opts){
        let that = this;
        this.searchBaseInfo(opts).then(res => {
          if(res.error_code === 0){
            that.$nextTick(() => {
              that.loading = false;
            })
          }else{
            this.$notify.error({
              title:'错误',
              message:res.error_msg
            })
          }
        }).catch((res) => {
          this.$notify.error({
            title  : '错误',
            message: '网络错误请重新再试'
          });
        })
      }



    },
    mounted(){
      this.getDocList(this.formInline);
      this.tableHeight=$('.table_container').height()

    },


  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/style/mixin.scss';
  .user-base-info{
    width:100%;
    position: absolute;
    top:0;
    bottom:0;
    .el-main {
      background: #f0f2f5;
      color: #333;
      text-align: center;
      width: 100%;
      position: absolute;
      overflow-y: hidden;
      bottom: 80px;
      top:0;
    }
    .doc_avatar{
      width:50px;
      height:50px;
    }
    .el-table .cell{
      overflow: hidden;
      white-space: nowrap;
    }
    .el-footer {
      height: 100px;
      background: #B3C0D1;
      position: absolute;
      bottom: 0;
      width: 100%;
      .show_num{
        @include ct();
        color: #303133;
        span{
          color: #409EFF
        }
      }
    }
  }


</style>
