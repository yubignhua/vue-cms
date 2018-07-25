/**
 * Created by yubh on 2018/3/10.
 */
import Vue from 'vue';
import Router from 'vue-router';

// 引入内嵌页面
import LayOut from '../pages/layout/layout';
import Login from '../pages/login/login';
import AppContainer from '../pages/app_container/app_container';
import test2 from '../pages/test2/test2';

// 引入懒加载页面
const NoFindPage = r => require.ensure([], () => r(require('../pages/errorPage/404')), '404');
const NoMatchPage = r => require.ensure([], () => r(require('../pages/errorPage/401')), '401');
const BaseInfo = r => require.ensure([], () => r(require('../pages/base_info/base_info')), 'base_info');
const AwaitPayUser = r => require.ensure([], () => r(require('../pages/await_pay_user/await_pay_user')), 'await_pay_user');
const WaitDis =  r => require.ensure([], () => r(require('../pages/wait_distribution/wait_distribution')),'wait_distribution');
const ManageDoc = r => require.ensure([], () => r(require('../pages/manage_doc_info/manage_doc_info')),'manage_doc_info');
const AssistantDoc = r => require.ensure([], () => r(require('../pages/assistant_doc/assistant_doc')),'assistant_doc');
const EndServerUser = r => require.ensure([], () => r(require('../pages/end_server_user/end_server_user')),'end_server_user');
const InServerUser = r => require.ensure([], () => r(require('../pages/in_server_user/in_server_user')),'in_server_user');
const InfoManage = r => require.ensure([], () => r(require('../pages/info_manage/info_manage')),'info_manage');
const healthManage = r => require.ensure([], () => r(require('../pages/health_manage/health_manage')),'health_manage');
const healthRecord = r => require.ensure([], () => r(require('../pages/health_record/health_record')),'health_record');
const editUserInfo = r => require.ensure([], () => r(require('../pages/edit_user_info/edit_user_info')),'edit_user_info');
const drugRecord = r => require.ensure([], () => r(require('../pages/drug_record/drug_record')),'drug_record');
const recentBprecord = r => require.ensure([], () => r(require('../pages/recent_bp_record/recent_bp_record')),'recent_bp_record');
const ambulatoryBlood = r => require.ensure([], () => r(require('../pages/ambulatory_blood/ambulatory_blood')),'ambulatory_blood');
const serverList = r => require.ensure([], () => r(require('../pages/server_list/server_list')),'server_list');
// const test2 = r => require.ensure([], () => r(require('../pages/test2/test2')),'test2');
// 配置页面路由
const routes = [
  { path: '/cdm', redirect: 'cdm/cdm_cms/layout/base_info' },
  { path: '/cdm/cdm_cms', redirect: 'cdm/cdm_cms/layout/base_info' },
  { path: '/cdm/cdm_cms',
    component:AppContainer,
    children:[
      { path: 'login',name:'登录', component: Login },
      //404页
      { path: '404', component: NoFindPage, hidden: true},
      { path: '401', component: NoMatchPage, hidden: true},
      // { path: 'cat', component: cat, hidden: true},
      //布局页
      { path: 'layout',
        component: LayOut,
        children:[
          { path: 'base_info',name:'用户基本信息', component: BaseInfo,meta: {keepAlive: true,rank:1} },
          { path: 'await_pay_user', name:'待支付用户',component: AwaitPayUser,meta: {keepAlive: false,rank:1 }},
          // { path: 'ambulatory_users', component: ambulatoryUsers,meta: {keepAlive: false} },
          { path: 'wait_distribution',name:'待分配用户', component: WaitDis,meta: {keepAlive: false,rank:1} },
          { path: 'manage_doc_info',name:'医生信息填写', component: ManageDoc,meta: {keepAlive: true,rank:1} },
          { path: 'assistant_doc',name:'医助信息填写', component: AssistantDoc,meta: {keepAlive: true,rank:1} },
          { path: 'end_server_user',name:'服务结束用户', component: EndServerUser,meta: {keepAlive: false,rank:1} },
          { path: 'in_server_user',name:'服务中用户', component: InServerUser,meta: {keepAlive: false,rank:1 }},
          { path: 'info_manage', name:'个人信息维护',component: InfoManage,meta: {keepAlive: true,rank:1} },
          // { path: 'health_manage', component: healthManage,meta: {keepAlive: false} },
          { path: 'healthRecord', component: healthRecord,meta: {keepAlive: false},
            children:[
              { path: 'edit_user_info',name:'编辑用户信息', component: editUserInfo,meta:{rank:2}},
              { path: 'drug_record',name:'用药记录', component: drugRecord,meta:{rank:2}},
              { path: 'recent_bp_record',name:'血压记录', component: recentBprecord,meta:{rank:2}},
              { path: 'ambulatory_blood',name:'动态血压记录', component: ambulatoryBlood,meta:{rank:2}},
              { path: 'server_list',name:'服务记录', component: serverList,meta:{rank:2}},
            ]
          },
        ]
      },
      {path:'test2',component:test2}
    ],
  },
];
// 实例化路由对象
Vue.use(Router);
// export default new Router({ mode: 'history', routes });
const router =  new Router({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});



export default router
