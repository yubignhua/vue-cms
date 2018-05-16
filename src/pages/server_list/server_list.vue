<template>
  <div class="server_list">

    <el-main>
      <!--头部搜索表单------------>
      <div class="dr_top">
        <div class="dr_des"> {{patientInfo.user_name}}  {{patientInfo.user_sex=='m'?'男':'女'}}  {{patientInfo.user_age}}岁 <el-tag v-if="patientInfo.user_custom_tags">{{patientInfo.user_custom_tags}}</el-tag> <el-tag v-if="patientInfo.user_remarks">{{patientInfo.user_remarks}}</el-tag></div>
        <el-button class="dr_new_drug" type="primary" icon="el-icon-plus" size="small" @click="dialogFormVisible = true">新增服务记录</el-button>
      </div>
      <!--表格数据------------>
      <div class="table_container">
        <el-table
          @row-click="showInfo"
          v-loading="loading"
          :data="tableData"
          style="width:100%"
          :max-height="tableHeight">

          <el-table-column prop="service_type" label="" min-width="120">
            <template slot-scope="scope">
              <div>{{showServerType(scope.row.service_type)}}:</div>
              <div>{{scope.row.content}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="" min-width="50">
            <template slot-scope="scope">

            </template>
          </el-table-column>

          <el-table-column prop="created_time" label="" min-width="120">
            <template slot-scope="scope">
              <div><i class="el-icon-time"/>{{scope.row.service_time}}</div>
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
    <!--新增服用药物-->
    <el-dialog title="新增服务记录" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="服务类型" prop="service_type"  size="small">
          <!--<el-input v-model="ruleForm.service_type" size="small"></el-input>-->
          <el-select v-model="ruleForm.service_type" placeholder="请选择">
            <el-option label="电话回访" value="1"></el-option>
            <el-option label="短信回访" value="2"></el-option>
            <el-option label="微信回访" value="3"></el-option>
            <el-option label="医生建议" value="4"></el-option>
            <el-option label="其他" value="9"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="服务时间" prop="service_time">
          <el-date-picker v-model="ruleForm.service_time" type="datetime" value-format="yyyy-MM-dd HH:MM:SS" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="服务记录" prop="content">
          <el-input type="textarea" v-model="ruleForm.content"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="showServerType(detailForms.service_type)" :visible.sync="detailForm">
      <div><span style="float: right;">{{detailForms.service_time}}</span></div>
      <div>来自:{{detailForms.oper_user_name}}</div>
      <div>内容: <span>{{detailForms.content}}</span></div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailForm = false">确 定</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  const ADD_SEVER_RECORD = '/cdm/staff/service/create';
  import {mapState,mapActions,mapGetters } from 'vuex';
  import { Loading } from 'element-ui';
  import {validPhone} from '../../assets/mUtils/validate'
  import request from '../../assets/mUtils/request'
  const SAVEUSERINFO = '/cdm/user/health/detail';

  export default {
    data() {
      return {
        tableHeight : $('.table_container').height(),
         dialogFormVisible:false,
        detailForm:false,
        userInfo:{},
        //新增用户表单状态
        ruleForm: {
          content:'',
          service_time: '',
          service_type: '',
          user_id: '',
        },
        detailForms:{
          content:'',
          service_time: '',
          service_type: '',
          user_id: '',
          oper_user_name:''
        },
        //表单检验
        rules: {
          content:[{required:true,message: '请输入备注内容',}],
          service_type:[{required:true,message: '请输入服务类型'}],
          service_time:[{required:true,message: '请输入服务时间'}],
        },
        index:0,
        pagesize:20,
        formInline:{
          curPage:1,
          user_id:''
        },
        //loading 开关
        loading:true,
      };
    },
    computed:{
      ...mapGetters(["patientId","patientInfo"]),
      ...mapState('serverList',{
        //列表数据
        tableData: state => state.userInfoList,
        tableDataSize:state=>state.userInfoList.length,
        //当前页数
        curPage: state => state.searchInfo.page,
        allPageNum:state => state.allPageNum,
        countPerPage:state=>state.countPerPage
      }),
      getCurPage(){
        return (this.curPage-1)*20+1
      },

    },
    methods: {
      ...mapActions('serverList',[
        'searchBaseInfo',//查询用户信息
        'changeDrugState',//更改用药状态
      ]),

      /**
       * 请求用户信息
       * @param id
       */
      async reqUserInfo(){
        let result = await this.request.get(SAVEUSERINFO,{params:{user_id: this.patientId}});
        this.userInfo = result.data.user_info
      },


      /**
       * 新增服务记录
       * @param formName
       */
      async submitForm(formName) {
        this.ruleForm.user_id = this.patientId;
        console.log('this.ruleForm:::',this.ruleForm)
        let that = this;
        const valid =  await new Promise((resolve,reject)=>{
          that.$refs[formName].validate( valid => valid?resolve(valid):reject(valid));
        });
        if(valid){
          const res = await request.post(ADD_SEVER_RECORD,that.ruleForm);
          this.dialogFormVisible = false;
          this.ruleForm.content='';
          this.ruleForm.service_time='';
          this.ruleForm.service_type='';
          this.ruleForm.user_id='';
          if(res.data.error_code === 0){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            if(that.curPage === 1){
              that.formInline.curPage = 1;
              this.loading = true;
              this.getDataList(this.formInline)
            }
          }else {
            that.$notify.error({
              title  : '错误',
              message: '没有此医生请重新输入ID'
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
        this.getDataList(this.formInline)
      },

      showInfo(row){
        this.detailForm = true;
        console.log(row)
        this.detailForms.service_time = row.service_time;
        this.detailForms.content = row.content;
        this.detailForms.service_type = row.service_type;
        this.detailForms.oper_user_name = row.oper_user_name;
      },

      /**
       * 获取药物列表
       */
      getDataList(formInline){
        let that = this;
        this.searchBaseInfo(formInline)
             .then(() => {
          that.$nextTick(() => {
            that.loading = false;
          })
        }).catch(() => {
          this.$notify.error({
            title  : '错误',
            message: '网络请求失败请重新再试'
          });
        })
      },

      showServerType(type){
      	let des = '';
      	switch (type){
          case 1: des = "电话回访";break;
          case 2: des ="短信回访";break;
          case 3: des ="微信回访";break;
          case 4: des ="医生建议";break;
          case 9: des ="其他";break;
        }
        return des;
      }


    },
    mounted(){
      this.tableHeight = $('.table_container').height();

      console.log('patientInfo:::',this.patientInfo)

      if(!this.patientId){
        this.$router.push({ path: '/cdm/cdm_cms/layout/health_manage'})
      }
      this.formInline.user_id = this.patientId;
      this.getDataList(this.formInline)
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/style/mixin.scss';
  .server_list{
    width:100%;
    position: absolute;
    top:0;
    bottom:0;
    .el-dialog__body{
      padding:20px!important;
    }
    .el-table .cell{
      text-align: left;
      padding-left:25px
    }
    .el-main {
      background: #ffffff;
      color: #333;
      text-align: center;
      width: 100%;
      position: absolute;
      overflow-y: hidden;
      bottom: 80px;
      padding:0;
      top:0;
      left:0;
      right:0;

      .dr_top{
        .dr_des{
          position: absolute;
          top:20px;
          z-index: 100;
          left:40px;
          padding-top:20px;
        }
        .dr_new_drug{
          position: absolute;
          top:10px;
          right: 35px;
          z-index: 100;

        }
      }
      .table_container{
        box-shadow: none;
      }

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
