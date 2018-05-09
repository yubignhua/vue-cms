/**
 * Created by yubh on 2018/3/10.
 */
import Vue from 'vue';
import Router from 'vue-router';

// 引入内嵌页面
import LayOut from '../pages/layout/layout';
import Login from '../pages/login/login';
import AppContainer from '../pages/app_container/app_container';

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
// 配置页面路由
const routes = [
  { path: '/cdm', redirect: 'cdm/cdm_cms/layout/base_info' },
  { path: '/cdm/cdm_cms', redirect: 'cdm/cdm_cms/layout/base_info' },
  { path: '/cdm/cdm_cms',
    component:AppContainer,
    children:[
      //登录页
      { path: 'login', component: Login },
      //404页
      { path: '404', component: NoFindPage, hidden: true},
      { path: '401', component: NoMatchPage, hidden: true},
      // { path: 'cat', component: cat, hidden: true},
      //布局页
      { path: 'layout',
        component: LayOut,
        children:[
          //用户基本信息页
          { path: 'base_info', component: BaseInfo,meta: {keepAlive: true} },
          //待支付用户
          { path: 'await_pay_user', component: AwaitPayUser,meta: {keepAlive: false} },
          //待分配用户
          { path: 'wait_distribution', component: WaitDis,meta: {keepAlive: false} },
          //医生信息填写
          { path: 'manage_doc_info', component: ManageDoc,meta: {keepAlive: true} },
          //医助信息填写
          { path: 'assistant_doc', component: AssistantDoc,meta: {keepAlive: true} },
          { path: 'end_server_user', component: EndServerUser,meta: {keepAlive: false} },
          { path: 'in_server_user', component: InServerUser,meta: {keepAlive: false} },
          { path: 'info_manage', component: InfoManage,meta: {keepAlive: true} },
          //用户健康管理
          { path: 'health_manage', component: healthManage,meta: {keepAlive: false} },
          { path: 'healthRecord', component: healthRecord,meta: {keepAlive: false},
            children:[
              { path: 'edit_user_info', component: editUserInfo},
              { path: 'drug_record', component: drugRecord},
              { path: 'recent_bp_record', component: recentBprecord},
              { path: 'ambulatory_blood', component: ambulatoryBlood},
              { path: 'server_list', component: serverList},
            ]
          },
        ]
      },
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
