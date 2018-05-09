<template>
  <div class="recent_bp_record">

    <el-main>
      <!--头部搜索表单------------>
      <div class="dr_top">
        <div class="dr_des"> 最近血压记录:</div>
      </div>
      <!--表格数据------------>
      <div class="table_container">
        <el-table
          v-loading="loading"
          stripe
          :data="tableData"
          style="width:100%;margin-top: 20px;"
          :max-height="tableHeight">
          <el-table-column prop="filename" label="文件名" min-width="350">
            <template slot-scope="scope">
              <a :href="scope.row.url" style="color:#409EFF;">{{scope.row.filename}}</a>
            </template>

          </el-table-column>
          <el-table-column
            prop="upload_time"
            label="上传时间"
            min-width="120">
          </el-table-column>
          <el-table-column prop="has_badge" label="状态" min-width="120">
            <template slot-scope="scope">
              <span style="color: red;" v-if="scope.row.has_badge === true">未读</span>
              <span style="color: #409EFF;" v-if="scope.row.has_badge === false">已读</span>
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
  </div>
</template>

<script>
  //import {MixinSetInterval,MixinRouterState} from '../../assets/mUtils/mixin.js';

  const READ = '/cdm/user/pressure/report/read'

  import {mapState,mapActions,mapGetters } from 'vuex';
  import { Loading } from 'element-ui';
  import {validPhone} from '../../assets/mUtils/validate'
  import request from '../../assets/mUtils/request'

  export default {
    data() {
      return {
      	tableHeight : $('.table_container').height(),
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
      ...mapGetters(["patientId"]),
      ...mapState('ambulatoryBlood',{
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
      ...mapActions('ambulatoryBlood',[
        'searchBaseInfo',//查询用户信息
        'changeDrugState',//更改用药状态
      ]),
      /**
       * 分页回调方法
       * @param value
       */
      handleCurrentChange(value){
        let that = this;
        this.loading = true;
        this.formInline.curPage = value;
        this.searchBaseInfo(this.formInline)
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
      /**
       * 读取文件
       * @param id
       */
      readFile(row){
        console.log('row.report_id',row.report_id)
      	this.request.post(READ,{report_id:row.report_id});
      },

    },
    mounted(){
      this.tableHeight = $('.table_container').height();

      if(!this.patientId){
        this.$router.push({ path: '/cdm/cdm_cms/layout/health_manage'})
      }
      let that = this;
      this.formInline.user_id = this.patientId;
      this.searchBaseInfo(this.formInline)
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
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/style/mixin.scss';
  .recent_bp_record{
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
