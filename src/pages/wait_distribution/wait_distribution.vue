<template>
  <div class="wait_distribution">
    <!--tab 组件-->
    <el-tabs class="m-tabls" v-model="activeName2" @tab-click="handleClick">
      <!--tab1-->
      <el-tab-pane label="血压用户" name="first">
        <div class="user-base-info">
          <el-main>
            <!--头部搜索表单------------>
            <div class="top_search">
              <el-form :inline="true" :model="formInline" ref="formName" class="demo-form-inline" onsubmit="return false" style="float: left;margin-left: 20px;">
                <el-form-item label="">
                  <el-input v-model="formInline.query" v-on:keyup.enter.native="onSearchSubmit('formName')"  placeholder="请输入您要查询的内容"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" size="small" @click="onSearchSubmit('formName')">查询</el-button>
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
                  prop="user_name"
                  label="姓名"
                  min-width="50">
                </el-table-column>
                <el-table-column
                  prop="user_cellphone"
                  label="手机号"
                  min-width="50">
                </el-table-column>

                <el-table-column
                  prop="pay_time"
                  label="购买日期"
                  min-width="50">
                </el-table-column>

                <el-table-column
                  prop="valid_days"
                  label="有效期(月)"
                  min-width="50">
                </el-table-column>

                <el-table-column
                  prop="goods_name"
                  label="商品"
                  min-width="50">
                </el-table-column>

                <el-table-column
                  fixed="right"
                  label="操作"
                  min-width="50">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      @click.native.prevent="editRow(scope.$index, tableData)"
                      size="small">
                      绑定&分配
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-main>
          <!--footer------------>
          <el-footer style="background: white;border-top: solid 1px #f4f4f4;">
            <div class="show_num">显示第 <span>{{getCurPage}}</span> 到第 <span>{{tableDataSize+getCurPage-1}}</span> 条记录,总共 <span>{{allPageNum}}</span> 条记录</div>
            <el-pagination background :page-size="pageSize" layout="prev, pager, next" :current-page="curPage" @current-change="handleCurrentChange" :total="allPageNum"></el-pagination>
          </el-footer>

          <!--购买弹窗-->
          <el-dialog title="设备绑定&分配医生医助" :visible.sync="dialogAddEditVisible">
            <template v-if="dialogAddEditVisible">
              <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name"  size="small">
                  <el-input :disabled="true" v-model="editForm.user_name" size="small"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="cellphone">
                  <el-input :disabled="true" type="tel" v-model="editForm.user_cellphone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品" prop="goods_name"  size="small">
                  <el-input :disabled="true" v-model="editForm.goods_name" size="small"></el-input>
                </el-form-item>
                <el-form-item label="购买日期" prop="pay_time"  size="small">
                  <el-input :disabled="true" v-model="editForm.pay_time" size="small"></el-input>
                </el-form-item>
                <el-form-item label="有效期(月)" prop="valid_period"  size="small">
                  <el-input :disabled="true" v-model="editForm.valid_period" size="small"></el-input>
                </el-form-item>
                <el-form-item label="服务开始" prop="start_time">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="editForm.start_time" type="date" placeholder="选择日期" />
                </el-form-item>
                <el-form-item label="设备SN" prop="device_sn"  size="small">
                  <el-input v-model="editForm.device_sn" size="small"></el-input>
                </el-form-item>
                <el-form-item label="医生" prop="doctor_id"  size="small">
                  <el-select v-model="editForm.doctor_id" placeholder="请选择医生">
                    <el-option v-for="item in doctorList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="医助" prop="assistant_id"  size="small">
                  <el-select v-model="editForm.assistant_id" placeholder="请选择医助">
                    <el-option v-for="item in assistants" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </template>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogAddEditVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitEditForm('editForm')">确 定</el-button>
            </div>
          </el-dialog></el-dialog>

        </div>
      </el-tab-pane>
      <!--tab2 -->
      <el-tab-pane label="血糖用户" name="second">暂无数据</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapState,mapMutations,mapActions,mapGetters } from 'vuex'

  import {validPhone} from '../../assets/mUtils/validate'
  import DateAdd from '../../assets/mUtils/calcDate'
  const PURCHASE = '/cdm/purchase/add';
  const DIST = '/cdm/service/edit';
  export default {
    //mixins: [MixinSetInterval, MixinRouterState],
    data() {
      return {
        pageSize:20,
        tableHeight:$('.table_container').height(),
        stripe:true,
        activeName2: 'first',
        formInline : {
          query  : '',
          curPage:'1'
        },

        // 购买用户表单状态
        editForm:{
          assistant_id: '',
          doctor_id: '',
          service_id: '',
          start_time: '',
          end_time: '',
          device_sn: '',
          user_name: '',
          user_cellphone: '',
          goods_name: '',
          valid_period:'',
          pay_time:'',

        },
        //表单检验
        rules: {
          start_time:[{required:true,trigger:'blur',message: '请选择医助'}],
          device_sn:[{required:true,message: '请选择设备SN'}],
          assistant_id:[{required:true,message: '请选择医助'}],
          doctor_id:[{required:true,message: '请选择医生'}],
        },
        //购买用户弹窗开关
        dialogAddEditVisible:false,

        formLabelWidth: '90px',
        //loading 开关
        loading:true,
        curItem:0,//记录当前修改的用户id
        doctorList: [],
        assistants:[],
      };
    },

    watch: {
      'formInline.name': function(newState){
        this.SET_NAME(newState);
      },
      'formInline.phone': function(newState){
        this.SET_PHONE(newState);
      }
    },

    computed:{
      ...mapState('waitDistribution',{
        //列表数据
        tableData: state => state.userInfoList,
        tableDataSize:state=>state.userInfoList.length,
        //当前页数
        curPage: state => Number(state.searchInfo.page),
        allPageNum:state => state.allPageNum,
        countPerPage:state=>state.countPerPage
      }),
      ...mapGetters(["assistentList","docList"]),

      getCurPage(){
        return (this.curPage-1)*20+1
      },
    },
    methods: {
      ...mapActions('waitDistribution',[
        'searchBaseInfo',//查询用户信息
      ]),

      ...mapMutations('waitDistribution',[
        'SET_NAME',
        'SET_PHONE',
      ]),
      handleClick(tab, event) {
        console.log(tab, event);
      },

      /**
       * 初始化编辑状态
       */

      initPayState(){
        this.editForm.assistant_name = '';
        this.editForm.doctor_name = '';
        this.editForm.start_time = '';
        this.editForm.device_sn = '';
      },



      /**
       * 绑定分配
       * @param form
       */
      async submitEditForm(){
        let that = this;
        const valid = await new Promise((resolve, reject) => {
          that.$refs.editForm.validate( valid => valid ? resolve(valid) : reject(valid))
        });
        if(valid){
        	let mOpt = {};
        	mOpt.assistant_id = that.editForm.assistant_id;
        	mOpt.device_sn = that.editForm.device_sn;
        	mOpt.doctor_id = that.editForm.doctor_id;
        	//mOpt.end_time = that.editForm.end_time;
        	mOpt.service_id = that.editForm.service_id;
        	mOpt.start_time = that.editForm.start_time;
          console.log('------',mOpt);
          const res = await this.request.post(DIST,mOpt);
          //const res = await Axios.post("http://192.168.2.67:8005/cdm/service/edit",mOpt);
          that.dialogAddEditVisible = false;
          if(res.data.error_code === 0){
            this.initPayState();
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
       * 提交查询用户信息
       * @param formName
       */
      async onSearchSubmit(formName) {
        this.getSearchList(this.formInline);
      },
      /**
       * 分页回调方法
       * @param value
       */
      handleCurrentChange(value){
        console.log('value',value)
        console.log('this.curPage',this.curPage)
        console.log('this.allPageNum',this.allPageNum);
        if(!this.curPage) return;
        if(value == this.curPage) return;
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
        console.log(dataItem);
        this.initPayState();
        //更改编辑表格状态
        this.curItem = index;
        this.editForm.user_name = dataItem.user_name;
        this.editForm.user_cellphone = Number(dataItem.user_cellphone);
        this.editForm.goods_name = dataItem.goods_name;
        this.editForm.pay_time = dataItem.pay_time;
        this.editForm.start_time = dataItem.start_time;
        this.editForm.valid_period = dataItem.valid_days;
        this.editForm.service_id = dataItem.service_id;

        //显示弹窗
        this.dialogAddEditVisible = true;
      },

      /**
       * 计算日期和花费
       */
      selectChage(value){
        let num = Number(value);
        let newDate  =  DateAdd( "m ",num,new  Date());
        this.editForm.valid_period = newDate.toLocaleDateString();
        switch (num){
          case 1:this.editForm.total_price = 1500;break;
          case 3:this.editForm.total_price = 4500;break;
          case 6:this.editForm.total_price = 6000;break;
          case 12:this.editForm.total_price = 8000;break;
        }
      },

      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
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
        }).catch(() => {
          this.$notify.error({
            title  : '错误',
            message: '网络错误请重新再试'
          });
        })
      }
    },

    mounted(){
      this.tableHeight = $('.table_container').height();

      this.getSearchList(this.formInline);

      //console.log('this.docList',this.docList)
     // console.log('this.assistentList',this.assistentList)
      this.doctorList = this.docList.map(item => {
        return { value: item.user_id, label: item.name };
      });
      this.assistants = this.assistentList.map(item => {
        return { value: item.user_id, label: item.name };
      });

    },


  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/style/mixin.scss';

  .wait_distribution{
    width:100%;
    background: #ffffff;
    position: absolute;
    top:20px;
    left:20px;
    bottom:0;
    right:0;
    .top_search{
      box-shadow:none!important;
      padding:10px 0;
    }
    .table_container{
      box-shadow:none!important;
    }
    .m-tabls{
      padding-left:30px;
      padding-top:10px;
      .el-tabs__content{
        position: absolute;
        top: 49px;
        bottom: 0;
        left:0;
        right:0;
      }
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
          bottom: 60px;
          top:0;
          padding:0;
          background: #ffffff;
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

    }

  }


</style>
