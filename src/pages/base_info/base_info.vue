<template>
  <div class="user-base-info">
      <el-main>
        <!--头部搜索表单------------>
        <div class="top_search">
          <el-form :inline="true" :model="formInline" ref="formName" class="demo-form-inline" onsubmit="return false" style="float: left;margin-left: 20px;">
            <el-form-item label="">
              <el-input v-model="formInline.query" v-on:keyup.enter.native="onSearchSubmit('formName')"  placeholder="请输入查找内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="small"  @click="onSearchSubmit('formName')">查询</el-button>
              <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogFormVisible = true">新增患者</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--表格数据------------>
        <div class="table_container">
          <el-table
            :stripe='stripe'
            v-loading="loading"
            :data="tableData"
            style="width:100%"
            :max-height="tableHeight">
            <el-table-column
              fixed
              prop="name"
              label="姓名"
              min-width="50">
            </el-table-column>
            <el-table-column
              prop="cellphone"
              label="手机号"
              min-width="50">
            </el-table-column>
            <el-table-column prop="service_types" label="服务类型" min-width="50">
              <template slot-scope="scope">
                {{getArrData(scope.row.service_types)}}
              </template>
            </el-table-column>
            <el-table-column
              prop="source_id"
              label="微信号"
              min-width="50">
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              min-width="100">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              min-width="50">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit-outline"
                  @click.native.prevent="editRow(scope.$index, tableData)"
                  size="small">
                  编辑
                </el-button>
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
    <el-dialog title="新增患者" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">

        <el-form-item label="姓名" prop="name"  size="small">
          <el-input v-model="ruleForm.name" size="small"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="cellphone">
          <el-input type="tel" v-model.number="ruleForm.cellphone" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="微信ID" prop="weixinId"  size="small">
          <el-input v-model="ruleForm.source_id" size="small"></el-input>
        </el-form-item>

        <el-form-item label="服务" prop="type">
          <el-checkbox-group v-model="ruleForm.service_types">
            <el-checkbox label="1" value="1" name="type">血压服务</el-checkbox>
            <el-checkbox label="2" value="2" name="type">血糖服务</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑用户弹窗----->
    <el-dialog title="编辑患者" :visible.sync="dialogAddEditVisible">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="姓名" prop="name"  size="small">
          <el-input v-model="editForm.name" size="small"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="cellphone">
          <el-input type="tel" v-model.number="editForm.cellphone" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="微信ID" prop="weixinId"  size="small">
          <el-input v-model="editForm.source_id" size="small"></el-input>
        </el-form-item>

        <el-form-item label="服务" prop="type">
          <el-checkbox-group v-model="editForm.service_types">
            <el-checkbox label="1" value="1" name="type">血压服务</el-checkbox>
            <el-checkbox label="2" value="2" name="type">血糖服务</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="editForm.remarks"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    </el-dialog>

  </div>
</template>

<script>
  //import {MixinSetInterval,MixinRouterState} from '../../assets/mUtils/mixin.js';
  import { getToken, setToken, removeToken } from '../../assets/mUtils/auth'

  const ADDUSER = '/cdm/user/create';//修改用户基本信息
  const EDITUSER = '/cdm/user/edit';//修改用户基本信息
  import {mapState,mapActions } from 'vuex';
  import { Loading } from 'element-ui';
  import {validPhone} from '../../assets/mUtils/validate'

  export default {
    //mixins: [MixinSetInterval, MixinRouterState],
    data() {
      return {
        stripe:true,
        tableHeight:this.tableHeight = $('.table_container').height(),
        pagesize:20,
        formInline : {
          query  : '',
          page:1,
        },
        //新增用户表单状态
        ruleForm: {
          name: '',
          cellphone: '',
          remarks: '',
          source_id: '',
          service_types: [],
        },
        // 编辑用户表单状态
        editForm:{
          name: '',
          cellphone: '',
          remarks: '',
          source_id: '',
          service_types: [],
          user_id:''
        },
        //表单检验
        rules: {
          name: [
            { required: true, message: '请输入患者名称', trigger: 'blur' },
            { min: 1, max: 40, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          cellphone: [
            { required: true, message: '请填写正确的手机号码',trigger: 'blur',validator:validPhone},
            { type: 'number', message: '电话必须为数字值',trigger: 'blur'},
          ],
        },
        //新增用户弹窗开关
        dialogFormVisible: false,
        //编辑用户弹窗开关
        dialogAddEditVisible:false,
        formLabelWidth: '90px',
        //loading 开关
        loading:true,
        curItem:0,//记录当前修改的用户id
      };
    },

    computed:{
      ...mapState('baseInfo',{
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
      ...mapActions('baseInfo',[
      	'getBaseInfo',//获取基本用户信息列表
        'getOtherBaseInfo',//获取分页用户列表信息
        'searchBaseInfo',//查询用户信息
      ]),

      /**
       * 提交查询用户信息
       * @param formName
       */
      async onSearchSubmit() {
        this.searchBaseInfo(this.formInline);
      },

      getArrData(arr){
      	if(!arr) return;
      	let sArr = JSON.parse(arr);
      	//console.log('sArr*****',sArr);
        let mArr = '';
        for(let i = 0;i<sArr.length;i++){
          if(sArr[i] === '1'){
            mArr+= '血压服务 '
          }else if(sArr[i] === '2'){
            mArr+='血糖服务 '
          }
        }
        return mArr
      },


      /**
       * 提交新增用户
       * @param formName
       */
      async submitForm(formName) {
      	var that = this;
        const valid =  await new Promise(function(resolve,reject){that.$refs[formName].validate( valid => valid?resolve(valid):reject(valid))});
        if(valid){
          this.ruleForm.service_types = JSON.stringify(this.ruleForm.service_types);
          const res = await that.request.post(ADDUSER,that.ruleForm);
          this.dialogFormVisible = false;
          this.initRuleForm();
          if(res.data.error_code === 0){
            that.$notify({
              type: 'success',
              title:'成功',
              message:'添加新用户成功',
            });
            if(that.curPage === 1){
              that.getPageInfo(1)
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
       * 提交编辑用户信息表单
       * @param form
       */
      async submitEditForm(){
      	let that = this;
        //console.log('this.editForm====',this.editForm);
        this.editForm.service_types = JSON.stringify(that.editForm.service_types);
        const valid = await new Promise((resolve, reject) => {
          that.$refs.editForm.validate( valid => valid ? resolve(valid) : reject(valid))
        });
        if(valid){
          const res = await this.request.post(EDITUSER,that.editForm);
          that.dialogAddEditVisible = false;
          if(res.data.error_code === 0){
            //that.initEditForm();
            that.$notify({
              type: 'success',
              title:'成功',
              message:'用户信息修改成功',
            });
            if(that.curPage === 1){
              that.getPageInfo(1)
            }
          }else {
            this.editForm.service_types =[];
            that.$notify.error({
              title  : '错误',
              message: res.data.error_msg
            })
          }

        }
      },

      /**
       * 请求数据
       * @param value
       */
      getPageInfo(page){
      	let that = this;
      	this.formInline.page = page;
        this.searchBaseInfo(this.formInline).then(function(res){
          if(res.error_code === 0){
            that.$nextTick(function(){
              that.loading = false;
            });
          }else{
            that.$notify({
              type:'error',
              title: '错误',
              message: res.error_msg
            })
          }
        }).catch(function(error){
          that.$notify({
            title: '错误',
            message: error.error_msg,
            type:'error',
          })
        })
      },
      /**
       * 分页回调方法
       * @param value
       */
      handleCurrentChange(value){
        this.loading = true;
        this.formInline.page = value;
        this.getPageInfo(value);
      },
      /**
       * 编辑用户方法
       * @param index
       * @param dataList
       */
      editRow(index, dataList) {
      	let dataItem = dataList[index];
      	//更改编辑表格状态
        this.curItem = index;
        this.editForm.name = dataItem.name;
        this.editForm.cellphone = Number(dataItem.cellphone);
        this.editForm.remarks = dataItem.remarks;
        this.editForm.source_id = dataItem.source_id;
        this.editForm.service_types = JSON.parse(dataItem.service_types);
        this.editForm.user_id = dataItem.user_id;
        //显示弹窗
        this.dialogAddEditVisible = true;
      },
      /**
       * 初始化编辑状态
       */
      initEditForm(){
        this.editForm.name = '';
        this.editForm.cellphone = '';
        this.editForm.remarks = '';
        this.editForm.source_id = '';
        this.editForm.service_types = [];
        this.editForm.user_id = '';
      },
      /**
       * 初始化新增用户状态
       */
      initRuleForm(){
        this.ruleForm.name = '';
        this.ruleForm.cellphone = '';
        this.ruleForm.remarks = '';
        this.ruleForm.source_id = '';
        this.ruleForm.service_types = [];
      },
      /**
       * 初始化查询状态
       */
      initSearchState(){
         this.formInline.query = '';
         this.formInline.page = '1';
      }

    },
    mounted(){
      this.tableHeight = $('.table_container').height();
      this.getPageInfo(this.formInline.page);
     // console.log('this:::',this)
    }
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
