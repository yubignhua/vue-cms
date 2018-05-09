<template>
  <div id="lay-out" class="lay-out">
    <el-header style="text-align: right; font-size: 12px">
      <div class="title"> 慢性病管理系统 CMS</div>
      <span>{{name}}</span>
      <el-dropdown>
        <i class="el-icon-setting" style="padding: 10px 10px;"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><div @click="logOutEvent">退出登录</div></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-container style="position:absolute;top:60px;width:100%;bottom: 0; border: 1px solid #eee">
      <!--侧边栏导航------------>
      <el-aside width="230px" style="background-color:#ffffff">
        <el-menu
          :default-openeds="['1','2','3']"
          :default-active="fullPath"
          :router = "true">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>用户基础信息管理</template>
            <el-menu-item-group>
              <el-menu-item index="/cdm/cdm_cms/layout/base_info">用户基本信息</el-menu-item>
              <el-menu-item index="/cdm/cdm_cms/layout/await_pay_user">待购买用户信息</el-menu-item>
              <el-menu-item index="/cdm/cdm_cms/layout/wait_distribution">待分配用户</el-menu-item>
              <el-menu-item index="/cdm/cdm_cms/layout/in_server_user">服务中用户</el-menu-item>
              <el-menu-item index="/cdm/cdm_cms/layout/end_server_user">服务结束用户</el-menu-item>
              <el-menu-item index="/cdm/cdm_cms/layout/info_manage">单个信息维护</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-edit"></i>医生&医助信息管理</template>
            <el-menu-item-group>
              <el-menu-item index="/cdm/cdm_cms/layout/manage_doc_info">医生信息填写</el-menu-item>
              <el-menu-item index="/cdm/cdm_cms/layout/assistant_doc">医助信息填写</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>用户医疗健康管理</template>
            <el-menu-item-group>
              <el-menu-item index="/cdm/cdm_cms/layout/health_manage">用户健康管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container class="main_c">
        <!--路由组件-->
        <transition name="router-slid" mode="out-in">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
        </transition>
        <transition name="router-slid" mode="out-in">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {mapActions,mapGetters } from 'vuex';
  export default {
    data() {
      return {
      	path:'/cdm/cdm_cms/layout/base_info'
      };
    },
    methods: {
      ...mapActions([
        'loginOut',
        'getDoctorList',
        'getAssistentListList'
      ]),

      /**
       * 登出
       */
      logOutEvent(){
        this.loginOut()
          .then(res => {
          	if(res.error_code){
              this.$router.push({path:'/cdm/cdm_cms/login'})
            }else{
          		this.$notify({
          			type:'error',
                message:res.error_msg,
                title:'错误'
              })
            }
        })
        .catch(()=>{
        	alert('登出失败')
        })

      }

    },
		computed: {
      ...mapGetters(["name","fullPath"])
    },
    mounted(){
      this.getDoctorList();
      this.getAssistentListList();
    }




	};
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/style/mixin.scss';
  .lay-out{
    font-family: 'PingFangSC-Light';
    font-size: 14px;
    position: absolute;
    background: #f0f2f5;
    width: 100%;
    top:0;
    bottom:0;
    .m_item{
      margin-top: 60px;
      display: block;
    }

    .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
    }
    .el-header {
      background-color: #FFFFFF;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
    .el-footer{

    }

    .el-aside {
      &::-webkit-scrollbar {
        display:none
      }
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }
    .el-table th{
      text-align: center;
    }

    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
      margin-bottom: 0!important;
      padding: 9px 0!important;
    }

    .main_c{
      overflow-y: hidden;
      overflow-x:hidden;
      position: relative;
    }
    .table_container{
      //position: absolute;
      //top:70px;
      //bottom:0;
      width: 100%;
      //margin-top:20px;
      //border-bottom: 1px solid #ebebeb;
      box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
    }
    .wait_distribution{
      background: #f4f4f5!important;
      top: 5px!important;
      left: 5px!important;
      bottom: 0;
      right: 5px!important;
    }
    .wait_distribution .m-tabls{
      background: #fff;
    }
    .el-dialog__body {
      padding: 0;
      margin-right: 40px;
    }
    .el-main {
      background: rgb(240, 242, 245);
      color: #333;
      text-align: center;
      position: relative;
      overflow-y: hidden;
      overflow-x: hidden;
      padding:5px!important;
      bottom:65px!important;
      .table_container{
        margin-top:0!important;
        position: absolute;
        top:60px;
        bottom:0;
        /*.el-table{*/
          /*overflow-x: auto;*/
        /*}*/
      }
      .top_search {
        overflow: hidden;
        background: rgb(255, 255, 255);
        z-index: 500;
        width: 100%;
        border-bottom: 1px solid #ebeef5;
        //border-bottom: 1px solid #ebebeb;
        //box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);

      }
    }

    .el-footer{
      height:100px;
      background: #B3C0D1;
      margin-left:5px;
    }
    .wait_distribution{
      .el-footer{
        margin-left:0;

      }

    }
    .el-pagination{
      float:right;
      box-sizing: border-box;
      position: relative;
      top: 16px;
    }
    .el-header .title {
      font-size: 30px;
      color: #666;
      float: left;
      margin-left: 45px;
    }

    .el-menu-item-group__title{
      padding: 0;
    }

    body > .el-container {
      margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }


  }


</style>
