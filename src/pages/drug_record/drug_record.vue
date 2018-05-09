<template>
  <div class="drug_record">
    <el-main>
      <!--头部搜索表单------------>
      <div class="dr_top">
        <div class="dr_des"> 最近用药情况:</div>
        <el-button class="dr_new_drug" type="success" icon="el-icon-plus" size="small" @click="dialogFormVisible = true">增加用药</el-button>
      </div>
      <!--表格数据------------>
      <div class="table_container">
        <el-table
          stripe
          v-loading="loading"
          border
          :data="tableData"
          style="width:100%;margin-top: 20px;"
          :max-height="tableHeight">
          <el-table-column
            fixed
            prop="name"
            label="药物名称"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="dose"
            label="药物剂量"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="record_time"
            label="记录时间"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="take_drug_feq"
            label="服药频次"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="take_start_time"
            label="服药开始日期"
            min-width="50">
          </el-table-column>

          <el-table-column
            prop="take_end_time"
            label="服药结束日期"
            min-width="50">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="用药备注"
            min-width="50">
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="50">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 3">停止用药</span>
              <span v-if="scope.row.status === 2">服药结束</span>
              <span v-if="scope.row.status === 1">服药中</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="50">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1">
                <el-button type="primary"  @click.native.prevent="editRow(scope.$index, tableData)" size="small">
                  停止用药
              </el-button>
              </span>
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
    <el-dialog title="新增服用药物" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

        <el-form-item label="药物名称" prop="name"  size="small">
          <el-input v-model="ruleForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="剂量(mg,ml)" prop="dose"  size="small">
          <el-input v-model="ruleForm.dose" size="small"></el-input>
        </el-form-item>
        <el-form-item label="服药频次" prop="take_drug_feq">
          <el-select v-model="ruleForm.take_drug_feq" placeholder="请选择">
            <el-option key="1/6h" label="1/6h" value="1/6h"/>
            <el-option key="1/8h" label="1/8h" value="1/8h"/>
            <el-option key="1/12h" label="1/12h" value="1/12h"/>
            <el-option key="1/24h" label="1/24h" value="1/24h"/>
          </el-select>
        </el-form-item>
        <el-form-item label="服用开始日期" prop="take_start_time">
          <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.take_start_time" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="服用结束日期" prop="take_end_time">
          <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.take_end_time" type="date" placeholder="选择日期" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定停止用药吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  //import {MixinSetInterval,MixinRouterState} from '../../assets/mUtils/mixin.js';

  const  ADD_DRUG = '/cdm/user/drug/add';//新增用药
  import {mapState,mapActions,mapGetters } from 'vuex';
  import { Loading } from 'element-ui';
  import {validPhone} from '../../assets/mUtils/validate'
  import request from '../../assets/mUtils/request'

  export default {
    //components: {Toast, XHeader,},
    //mixins: [MixinSetInterval, MixinRouterState],
    //props: ['goBack'],
    data() {
      return {
        tableHeight : $('.table_container').height(),
        index : 0,
        pagesize : 20,
        formInline : {
          curPage : 1,
          user_id : ''
        },
        //新增用药状态
        ruleForm: {
          dose:'',
          record_time:'',
          name: '',
          take_drug_feq:[],
          take_end_time: '',
          take_start_time:'',
          remark: '',
          user_id: '',
        },

        //表单检验
        rules: {
          dose:[{required:true,message: '请输入用药剂量	',}],
          name:[{required:true,message: '请输入备注',}],
          record_time:[{required:true,message: '请输入记录时间',}],
          take_drug_feq:[{required:true,message: '请输入服药频次',}],
          take_end_time:[{required:true,message: '请输入服药结束时间	',}],
          take_start_time:[{required:true,message: '请输入take_start_time	',}],
        },
        dialogVisible:false,
        //新增用户弹窗开关
        dialogFormVisible: false,
        //编辑用户弹窗开关
        formLabelWidth: '90px',
        //loading 开关
        loading:true,
        curItem:0,//记录当前修改的用户id
      };
    },
    computed:{
      ...mapGetters(["patientId"]),
      ...mapState('drugRecord',{
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
      ...mapActions('drugRecord',[
        'searchBaseInfo',//查询用户信息
        'changeDrugState',//更改用药状态
      ]),

      /**
       * 初始化新增医助信息
       */
      initDrugInfo(){
        this.ruleForm.dose = '';
        this.ruleForm.name = '';
        this.ruleForm.record_time = '';
        this.ruleForm.take_drug_feq = [];
        this.ruleForm.take_end_time = '';
        this.ruleForm.take_start_time = '';
        this.ruleForm.remark = '';
      },

      /**
       * 新增服用药物
       * @param formName
       */
      async submitForm(formName) {
        this.ruleForm.user_id = this.patientId;
        let that = this;
        const valid =  await new Promise((resolve,reject)=>{
          that.$refs[formName].validate( valid => valid?resolve(valid):reject(valid));
        });
        if(valid){
          const res = await request.post(ADD_DRUG,this.ruleForm);
          this.initDrugInfo();
          this.dialogFormVisible = false;
          if(res.data.error_code === 0){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            if(that.curPage === 1){
              that.formInline.curPage = 1;
              this.loading = true;
              this.getDataList(this.formInline);
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
        this.loading = true;
        this.formInline.curPage = value;
        this.getDataList(this.formInline);
      },
      /**
       * 修改用药状态
       * @param index
       * @param dataList
       */
       editRow(index) {
        this.dialogVisible = true;
        this.index = index;
      },

      confirmChange(){
        this.dialogVisible = false;
        this.ruleForm.user_id = this.patientId;
        this.changeDrugState({index:this.index,user_id:this.patientId}).then(res=>{
        	if(res.error_code === 0){
            this.$notify({
              type:'success',
              title  : '成功',
              message: '修改成功'
            });
            if(this.curPage === 1){
              this.formInline.curPage = 1;
              this.loading = true;
              this.getDataList(this.formInline);
            }
          }else{
            this.$notify({
              type:'error',
              title  : '成功',
              message: res.error_msg
            });
          }
        }).catch(res=>{
          alert(res.error_msg)
        });
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
      }
    },
    mounted(){
      this.tableHeight = $('.table_container').height();
      this.formInline.user_id = this.patientId;
      this.getDataList(this.formInline);
      if(!this.patientId){
        this.$router.push({ path: '/cdm/cdm_cms/layout/health_manage'})
      }
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/style/mixin.scss';
  .drug_record{
    width:100%;
    position: absolute;
    top:0;
    bottom:0;
    .el-dialog__body{
      padding:20px!important;
    }
    .el-main {
      background: #ffffff;
      color: #333;
      text-align: center;
      width: 100%;
      position: absolute;
      overflow-y: hidden;
      bottom: 60px;
      padding:0;
      top:0;
      left:0;
      right:0;

      .dr_top{
        padding:0 40px;
        padding-top:20px;
        .dr_des{
          float:left;
        }
        .dr_new_drug{
          float:right;
          position: relative;
          top: -8px;
          right: 25px;
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
