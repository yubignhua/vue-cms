<template>
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
      <div class="table_container" style="margin-top: 20px;">
        <el-table
          @row-click="changeTo"
          :stripe='true'
          v-loading="loading"
          :data="tableData"
          style="width:100%;min-height: 500px;"
          max-height="800">
          <el-table-column
            fixed
            prop="user_name"
            label="姓名"
            width="100">
          </el-table-column>

          <el-table-column
            prop="user_cellphone"
            label="手机号"
            width="100">
          </el-table-column>

          <el-table-column prop="user_sex" label="性别" width="50">
            <template slot-scope="scope">
              {{scope.row.user_sex==="m"?"男":"女"}}
            </template>
          </el-table-column>
          <el-table-column
            prop="user_age"
            label="年龄"
            width="50">
          </el-table-column>
          <el-table-column
            prop="start_time"
            label="服务开始"
            min-width="50">
          </el-table-column>

          <el-table-column
            prop="end_time"
            label="服务结束"
            min-width="50">
          </el-table-column>

          <el-table-column
            prop="doctor_name"
            label="医生"
            min-width="50">
          </el-table-column>

          <el-table-column
            prop="assistant_name"
            label="医助"
            min-width="50">
          </el-table-column>

          <el-table-column
            prop="user_remarks"
            label="用户备注"
            min-width="100">
          </el-table-column>


          <el-table-column fixed="right" prop="user_custom_tags" label="用户标签" width="100">
            <template slot-scope="scope">
              <el-tag  @click.native.stop="changeTag(scope.$index, scope.row.user_id)">
                {{scope.row.user_custom_tags?scope.row.user_custom_tags:"+"}}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="病情日历" width="100">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-date"
                @click.native.stop="showCalendar(scope.$index,scope.row.user_id)"
                size="small">
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

    <div v-if="dialogFormVisible">
      <el-dialog :visible.sync="dialogFormVisible">
        <full-calendar :events="fcEvents" locale="zh" lang="zh" @eventClick="dateClick" @changeMonth="changeMonth"></full-calendar>
      </el-dialog>
    </div>




  </div>
</template>

<script>
  //修改病人标签接口
  const EDITREMARK = '/cdm/user/edit';
  //日历查询接口
  const CADLENDAESEARCH = '/cdm/user/pressure/calendar/list';


  import {mapState,mapActions,mapMutations } from 'vuex';
  import { Loading } from 'element-ui';
  import moment from 'moment';
  import {validPhone} from '../../assets/mUtils/validate';
  export default {
    components:{'full-calendar': require('vue-fullcalendar')},
    data() {
      return {
      	userId:'',
        fcEvents: [],
        dialogFormVisible: false,
        pagesize: 20,
        formInline: {
          query  : '',
          curPage: 1,
        },
        //新增用户表单状态
        ruleForm: {
          doctorId: ''
        },
        //表单检验
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 1, max: 40, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请填写正确的手机号码', trigger: 'blur', validator: validPhone},
            {type: 'number', message: '电话必须为数字值', trigger: 'blur'},
          ],
        },
        //loading 开关
        loading: true,
      };
    },

    computed:{
      ...mapState('healthManage',{
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
      ...mapActions('healthManage',[
        'searchBaseInfo',//查询用户信息
      ]),
      ...mapMutations('healthManage',[
      	//更改列表标签
      	'CHANGETAG'
      ]),



      /**
       * 提交查询用户信息
       * @param formName
       */
      async onSearchSubmit() {
        let that = this;
        that.loading = true;
        this.getSearchList(this.formInline)

      },
      /**
       * 请求更改标签
       * @param para
       */
      async requestChangeTag(DataMap){
      	const result = await this.request.post(EDITREMARK,DataMap);
      	return result;
      },

      /**
       * 请求查询日历
       * @param para
       */
      async reqCalendar(start,end){
      	const result = await this.request.get(CADLENDAESEARCH,{params:{end_date:end,start_date:start,user_id:this.userId}});
      	return result;
      },

      /**
       * 分页回调方法
       * @param value
       */
      handleCurrentChange(value){
        let that = this;
        this.loading = true;
        this.formInline.curPage = value;
        this.getSearchList(this.formInline)

      },
      /**
       * 更改标签
       * @param index
       * @param tableData
       */
      changeTag(index, id){
        this.$prompt('请修改用户标签', {
          inputValue:this.tableData[index].user_custom_tags,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          this.requestChangeTag({custom_tags:value,user_id:id}).then((res) => {
                if (res.data.error_code === 0) {
                	console.log('value:::',value);
                  this.CHANGETAG({value, index});
                  this.$message({
                    type: 'success',
                    message: '更改成功'
                  });
                }
              }).catch((res) => {
                    this.$message({
                      type: 'error',
                      message: res.data.error_msg
                    });
                  })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });
            });
      },
      /**
       * 展示用户病情日历
       * @param index
       * @param id
       */
      showCalendar(index, id){
      	//展示弹窗并存储 userid
        this.dialogFormVisible = true;
        this.userId = id;
      },

      /**
       * 日历时间点击提醒事件
       * @param value
       */
      dateClick(event){
        console.log(event);
        this.$alert(event.title, {
          confirmButtonText: '确定',
        });

      },

      /**
       * 处理血压数据
       */
      dealBpData(arr){
      	if(!arr || arr.length <= 0) return;
      	let mArr = [];
      	for(let i=0;i<arr.length;i++){
          let mObj = {},item = arr[i];
          mObj.title = `血压:${item.high_pressure}/${item.low_pressure},测量时间:${item.upload_time}`;
          mObj.start = item.upload_time.split(' ')[0];
          if(item.high_pressure_status === 1 || item.high_pressure_status === 2 || item.low_pressure_status === 1 || item.low_pressure_status === 2){
            mObj.cssClass = 'red';
          }else{
            mObj.cssClass = 'blue';
          }
          mArr.push(mObj);
        }
        return mArr;
      },


      /**
       * 更改月份事件
       */
      changeMonth(start, end, current){
        let curDate = moment(current).format('YYYY-MM-DD');
        let startTime = moment(current).startOf('month').format('YYYY-MM-DD');
        let endTime = moment(current).endOf("month").format('YYYY-MM-DD');
        console.log(curDate,startTime,endTime);
        this.fcEvents = [];
        this.reqCalendar(startTime,endTime).then(res=>{
        	//console.log('////////',res.data.pressure_list);
        	if(res.data.pressure_list.length<=0) return;
        	let newData = this.dealBpData(res.data.pressure_list);
        	//console.log('new Data:::',newData)
        	if(res.data.error_code === 0){
            this.fcEvents = [...newData]
          }else{
            this.$notify.error({
              title  : '错误',
              message: '网络请求失败请重新再试'
            });
          }
        })
      },
      /**
       * 跳转用户详情
       */
      changeTo(row){
      	this.$router.push({ path: '/cdm/cdm_cms/layout/healthRecord/edit_user_info'});
      	console.log('row.user_id',row.user_id);
        this.$store.commit('SET_CUR_PATINET_ID',row.user_id);
        this.$store.commit('SET_CUR_PATINET_INFO',row);
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
      this.getSearchList(this.formInline)
    },


  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/style/mixin.scss';
  .el-dialog__body{
    //display: none;
    padding:0;
    .red{
      color:red!important;
    }
    .blue{
      color: blue!important;
    }
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
      /*overflow-y: hidden;*/
      bottom: 80px;
      top:0;

    .el-tag {
      cursor: pointer;
    }
    }
    .el-table .cell{
      /*overflow: hidden;*/
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
