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
          <el-table-column
            prop="upload_time"
            label="时间"
            min-width="150">
          </el-table-column>
          <el-table-column prop="high_pressure" label="高压" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.high_pressure}}</span>
              <span v-if="scope.row.high_pressure_status === 1"><i class="el-icon-sort-down i_blue"></i></span>
              <span v-if="scope.row.high_pressure_status === 2"><i class="el-icon-sort-up red"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="low_pressure" label="低压" min-width="150">
            <template slot-scope="scope">
              <span>{{scope.row.low_pressure}}</span>
              <span v-if="scope.row.low_pressure_status === 1"><i class="el-icon-sort-down i_blue"></i></span>
              <span v-if="scope.row.low_pressure_status === 2"><i class="el-icon-sort-up red"></i></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="heart_rate"
            label="心率"
            min-width="150">
          </el-table-column>
          <!--<el-table-column prop="status" label="状态" min-width="120">-->
            <!--<template slot-scope="scope">-->
              <!--<span v-if="scope.row.status === 'init'">初始状态</span>-->
              <!--<span v-if="scope.row.status === 'stop'">停止用药</span>-->
              <!--<span v-if="scope.row.status === 'finish'">服药结束</span>-->
              <!--<span v-if="scope.row.status === 'using'">服药中</span>-->
            <!--</template>-->
          <!--</el-table-column>-->

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

  import {mapState,mapActions,mapGetters } from 'vuex';
  import { Loading } from 'element-ui';
  import {validPhone} from '../../assets/mUtils/validate'
  import request from '../../assets/mUtils/request'

  export default {
    data() {
      return {
        tableHeight : $('.table_container').height(),
        index : 0,
        pagesize : 20,
        formInline : {
          curPage : 1,
          user_id : ''
        },
        //loading 开关
        loading:true,
      };
    },
    computed:{
      ...mapGetters(["patientId"]),
      ...mapState('recentBpRecord',{
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
      ...mapActions('recentBpRecord',[
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
      .el-icon-sort-down.i_blue{
        color:blue
      }
      .el-icon-sort-up.red{
        color: red;
      }
      .dr_top{
        //display: none;
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
        top:0
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
