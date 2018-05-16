<template>
  <div class="user-base-info">

    <el-main>
      <!--头部搜索表单------------>
      <div class="top_search">
        <el-form :inline="true" :model="formInline" ref="formName" class="demo-form-inline" onsubmit="return false" style="float: left;margin-left: 20px;">
          <el-form-item label="">
            <el-input v-model="formInline.query" v-on:keyup.enter.native="onSearchSubmit('formName')"  placeholder="请输入查询信息"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="onSearchSubmit('formName')">查询</el-button>
            <template  v-if="roles[1] === 2">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogFormVisible = true">新增医助</el-button>
            </template>
          </el-form-item>
        </el-form>

      </div>
      <!--表格数据------------>
      <div class="table_container" style="margin-top: 20px;">
        <el-table
          stripe
          v-loading="loading"
          :data="tableData"
          style="width:100%;min-height: 500px;"
          :max-height="tableHeight">
          <el-table-column
            fixed
            prop="name"
            label="姓名"
            min-width="100">
          </el-table-column>
          <el-table-column prop="sex" label="性别" min-width="50">
            <template slot-scope="scope">
              {{scope.row.sex == 'm'?'男':'女'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="出生日期"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="cellphone"
            label="手机号"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="telphone"
            label="座机"
            min-width="150">
          </el-table-column>

          <el-table-column
            prop="nickname"
            label="微信号"
            min-width="150">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="120">
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

    <!--新增医助弹窗-->
    <el-dialog title="新增医助" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">

        <el-form-item label="姓名" prop="name"  size="small">
          <el-input v-model="ruleForm.name" size="small"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择">
            <el-option key="男" label="男" value="m"/>
            <el-option key="女" label="女" value="f"/>
          </el-select>
        </el-form-item>

        <el-form-item label="生日" prop="birthday">
          <el-date-picker value-format="yyyy-MM-dd" v-model="ruleForm.birthday" type="date" placeholder="选择日期" />
        </el-form-item>

        <el-form-item label="手机" prop="cellphone">
          <el-input type="tel" v-model.number="ruleForm.cellphone" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="座机" prop="telphone">
          <el-input v-model="ruleForm.telphone" placeholder="请输入座机号"></el-input>
        </el-form-item>

        <el-form-item label="微信" prop="nickname"  size="small">
          <el-input v-model="ruleForm.nickname" size="small"></el-input>
        </el-form-item>


      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑医助弹窗----->
    <el-dialog title="编辑医助" :visible.sync="dialogAddEditVisible">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="姓名" prop="name"  size="small">
          <el-input v-model="editForm.name" size="small"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="editForm.sex" placeholder="请选择">
            <el-option key="男" label="男" value="m"/>
            <el-option key="女" label="女" value="f"/>
          </el-select>
        </el-form-item>

        <el-form-item label="生日" prop="birthday">
          <el-date-picker value-format="yyyy-MM-dd" v-model="editForm.birthday" type="date" placeholder="选择日期" />
        </el-form-item>

        <el-form-item label="手机" prop="cellphone">
          <el-input type="tel" v-model.number="editForm.cellphone" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="座机" prop="telphone">
          <el-input v-model="editForm.telphone" placeholder="请输入座机号"></el-input>
        </el-form-item>

        <el-form-item label="微信" prop="nickname"  size="small">
          <el-input v-model="editForm.nickname" size="small"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('editForm')">确 定</el-button>
      </div>
    </el-dialog></el-dialog>

  </div>
</template>

<script>
  //import {MixinSetInterval,MixinRouterState} from '../../assets/mUtils/mixin.js';

  const DEALASSISTANT = '/cdm/assistant/edit';//修改医助信息
  const ADD_ASSISTANT = '/cdm/assistant/create';//增加医助
  import {mapState,mapActions,mapGetters } from 'vuex';
  import { Loading } from 'element-ui';
  import {validPhone} from '../../assets/mUtils/validate'

  export default {
    //components: {Toast, XHeader,},
    //mixins: [MixinSetInterval, MixinRouterState],
    //props: ['goBack'],
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
          sex:'',
          birthday:'',
          name: '',
          cellphone:'',
          telphone: '',
          nickname: '',
        },
        // 编辑用户表单状态
        editForm:{
          sex:'',
          birthday:'',
          name: '',
          cellphone:'',
          telphone: '',
          nickname: '',
          assistant_id:'',
        },
        //表单检验
        rules: {
          sex:[{required:true,message: '请输入性别',}],
          birthday:[{required:true,message: '请输入您的生日',}],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 40, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          cellphone: [
            { required: true, message: '请填写正确的手机号码',trigger: 'blur',validator:validPhone},
            { type: 'number', message: '电话必须为数字值',trigger: 'blur'},
          ],
//          telphone:[
//            { type: 'number', message: '电话必须为数字值',trigger: 'blur'},
//          ]
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
      ...mapState('assistantDoc',{
        //列表数据
        tableData: state => state.userInfoList,
        tableDataSize:state=>state.userInfoList.length,
        //当前页数
        curPage: state => state.curPage,
        allPageNum:state => state.allPageNum,
        countPerPage:state=>state.countPerPage
      }),
      ...mapGetters(["roles"]),

      getCurPage(){
        return (this.curPage-1)*20+1
      },

    },

    methods: {
      ...mapActions('assistantDoc',[
        'searchBaseInfo',//查询用户信息
      ]),

      /**
       * 初始化新增医助信息
       */
      initDocAssistantInfo(){
        this.editForm.name = '';
        this.editForm.sex = '';
        this.editForm.birthday = '';
        this.editForm.cellphone = '';
        this.editForm.telphone = '';
        this.editForm.nickname = '';
      },
      /**
       * 初始化编辑医助状态
       */
      initDocAssistantInfo(){
        this.ruleForm.name = '';
        this.ruleForm.sex = '';
        this.ruleForm.birthday = '';
        this.ruleForm.cellphone = '';
        this.ruleForm.telphone = '';
        this.ruleForm.nickname = '';
        this.ruleForm.assistant_id = '';
      },

      /**
       * 提交查询用户信息
       * @param formName
       */
      async onSearchSubmit() {
          this.getSearchList(this.formInline);
      },

      /**
       * 添加医助
       * @param formName
       */
      async submitForm(formName) {
        console.log(this.ruleForm);
        var that = this;
        const valid =  await new Promise((resolve,reject)=>{
          that.$refs[formName].validate( valid => valid?resolve(valid):reject(valid));
        });
        if(valid){
          const res = await this.request.post(ADD_ASSISTANT,that.ruleForm);
          this.dialogFormVisible = false;
          if(res.data.error_code === 0){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            if(that.curPage === 1){
              that.formInline.curPage = 1;
              this.loading = true;
              this.getSearchList(this.formInline);
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
       * 提交编辑医助
       * @param form
       */
      async submitEditForm(){
        let that = this;
        const valid = await new Promise((resolve, reject) => {
          that.$refs.editForm.validate( valid => valid ? resolve(valid) : reject(valid))
        });
        if(valid){
        	//console.log('that.editForm===',that.editForm)
          const res = await this.request.post(DEALASSISTANT,that.editForm);
          that.dialogAddEditVisible = false;
          if(res.data.error_code===0){
            this.initDocAssistantInfo();
            that.$notify({
              type: 'success',
              title:'成功',
              message:'用户信息修改成功',
            });
            if(that.curPage === 1){
              that.formInline.curPage = 1;
              this.loading = true;
              this.getSearchList(this.formInline);
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
        this.getSearchList(this.formInline);
      },
      /**
       * 编辑用户方法
       * @param index
       * @param dataList
       */
      editRow(index, dataList) {
        let dataItem = dataList[index];
        console.log('dataItem',dataItem);
        //更改编辑表格状态
        this.curItem = index;
        this.editForm.name = dataItem.name;
        this.editForm.cellphone = Number(dataItem.cellphone);
        this.editForm.sex = dataItem.sex;
        this.editForm.nickname = dataItem.nickname;
        this.editForm.telphone = dataItem.telphone;
        this.editForm.birthday = dataItem.birthday;
        this.editForm.assistant_id = dataItem.user_id;
        //显示弹窗
        this.dialogAddEditVisible = true;
        //console.log(dataList[index])
        //rows.splice(index, 1);
      },
      /**
       * 获取查询列表
       * @param opts
       */
      getSearchList(opts){
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
      this.getSearchList(this.formInline);
      this.tableHeight = $('.table_container').height();
      console.log('role===',this.roles)
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
