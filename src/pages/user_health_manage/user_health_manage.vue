<template>
  <div class="user-base-info">

    <el-main>
      <!--头部搜索表单------------>
      <div class="top_search">
        <el-form :inline="true" :model="formInline" ref="formName" onsubmit="return false" class="demo-form-inline" style="float: left;margin-left: 50px;">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" v-on:keyup.enter.native="onSearchSubmit('formName')"  placeholder="姓名"></el-input>
          </el-form-item>

          <el-form-item label="手机" prop="phone" :rules="[{ type: 'number', message: '手机号须为数字',trigger:'change'}]">
            <el-input type="tel" v-model.number="formInline.phone"  placeholder="手机" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="onSearchSubmit('formName')">查询</el-button>
            <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogFormVisible = true">新增患者</el-button>
          </el-form-item>
        </el-form>

      </div>
      <!--表格数据------------>
      <div class="table_container">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width:100%;min-height: 500px;"
          max-height="800">
          <el-table-column
            fixed
            prop="name"
            label="姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="type"
            label="服务类型"
            width="220">
          </el-table-column>
          <el-table-column
            prop="weixinId"
            label="微信号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="620">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="220">
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

        <el-form-item label="手机" prop="phone">
          <el-input type="tel" v-model.number="ruleForm.phone" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="微信ID" prop="weixinId"  size="small">
          <el-input v-model="ruleForm.weixinId" size="small"></el-input>
        </el-form-item>

        <el-form-item label="服务" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="血压服务" value="1" name="type"></el-checkbox>
            <el-checkbox label="血糖服务" value="2" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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

        <el-form-item label="手机" prop="phone">
          <el-input type="tel" v-model.number="editForm.phone" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="微信ID" prop="weixinId"  size="small">
          <el-input v-model="editForm.weixinId" size="small"></el-input>
        </el-form-item>

        <el-form-item label="服务" prop="type">
          <el-checkbox-group v-model="editForm.type">
            <el-checkbox label="血压服务" value="1" name="type"></el-checkbox>
            <el-checkbox label="血糖服务" value="2" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="editForm.remark"></el-input>
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

  const ADDUSER = 'addUser.json';//修改用户基本信息
  import {mapState,mapActions } from 'vuex';
  import { Loading } from 'element-ui';
  import {validPhone} from '../../assets/mUtils/validate'

  export default {
    //components: {Toast, XHeader,},
    //mixins: [MixinSetInterval, MixinRouterState],
    //props: ['goBack'],
    data() {
      return {
        pagesize:20,
        formInline : {
          name  : '',
          phone: '',
        },
        //新增用户表单状态
        ruleForm: {
          name: '',
          phone: '',
          remark: '',
          weixinId: '',
          type: [],
        },
        // 编辑用户表单状态
        editForm:{
          name: '',
          phone: '',
          remark: '',
          weixinId: '',
          type: [],
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
        //编辑用户弹窗开关
        dialogAddEditVisible:false,
        formLabelWidth: '90px',
        //loading 开关
        loading:true,
        curItem:0,//记录当前修改的用户id
      };
    },

    computed:{
      ...mapState('userHealthManage',{
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

      getTableInfo(){
        let arr = [];
        let itemObj = {
          name    : '王小虎',
          phone: '200333',
          serverType    : '1',
          qudao : '上海市普陀区金沙江路 1518 弄',
          beizhu     : 200333,
        };
        for(let i=0;i<20;i++){
          arr.push(itemObj);
        }
        return  arr
      }
    },

    methods: {
      ...mapActions('userHealthManage',[
        'getBaseInfo',//获取基本用户信息列表
        'getOtherBaseInfo',//获取分页用户列表信息
        'searchBaseInfo',//查询用户信息
      ]),

      /**
       * 提交查询用户信息
       * @param formName
       */
      async onSearchSubmit() {
        if(this.formInline.name === '' && this.formInline.phone === '')
          this.$message({
            message: '请输入查询内容',
            type: 'warning'
          });
        else
          this.searchBaseInfo(this.formInline);
      },

      /**
       * 提交新增用户
       * @param formName
       */
      async submitForm(formName) {
        //console.log(this.ruleForm);
        var that = this;
        const valid =  await new Promise((resolve,reject)=>{
          that.$refs[formName].validate( valid => valid?resolve(valid):reject(valid));
        });
        if(valid){
          const res = await Axios.post(ADDUSER,{params:{data:that.ruleForm}});
          this.dialogFormVisible = false;
          if(res.data.message){
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
              message: '网络请求失败请重新再试'
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
        const valid = await new Promise((resolve, reject) => {
          that.$refs.editForm.validate( valid => valid ? resolve(valid) : reject(valid))
        });
        if(valid){
          const res = await Axios.post(ADDUSER,{params:{data:that.editForm}});
          that.dialogAddEditVisible = false;
          if(res.data.message){
            that.$notify({
              type: 'success',
              title:'成功',
              message:'用户信息修改成功',
            });
            if(that.curPage === 1){
              that.getPageInfo(1)
            }
          }else {
            that.$notify.error({
              title  : '错误',
              message: '用户信息修改失败'
            })
          }

        }
      },

      /**
       * 请求数据
       * @param value
       */
      getPageInfo(page){
        var that = this;
        this.getOtherBaseInfo(page)
          .then(() => {
            that.$nextTick(()=>{
              that.loading = false;
            })
          })
          .catch(() => {
            this.$notify.error({
              title: '错误',
              message: '网络请求失败请重新再试'
            });
          })
      },


      /**
       * 分页回调方法
       * @param value
       */
      handleCurrentChange(value){
        this.loading = true;
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
        this.editForm.phone = Number(dataItem.phone);
        this.editForm.remark = dataItem.remark;
        this.editForm.weixinId = dataItem.weixinId;
        this.editForm.type = dataItem.type;
        //显示弹窗
        this.dialogAddEditVisible = true;
        //console.log(dataList[index])
        //rows.splice(index, 1);
      },
    },
    mounted(){
      console.log(this.tableData.length)
      let that = this;
      this.getBaseInfo()
        .then(function () {
          that.$nextTick(() => {
            that.loading = false;
          });
        }).catch(() => {
        this.$notify.error({
          title  : '错误',
          message: '网络请求失败请重新再试'
        });
      });
    },

    // let loadingInstance1 = Loading.service({ fullscreen: true });

    //computed: {},
    //created () {},

    //updated () {},

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
