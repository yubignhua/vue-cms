/**
 * Created by yubh on 2018/4/9.
 */
import router from './router/router';
import store from './store';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from './assets/mUtils/auth'

NProgress.configure({ showSpinner: false });



function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true;
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect'];
let routeList = [];


/**
 * 路由登录 角色 权限控制
 */
router.beforeEach((to, from, next) => {
  //alert(to.path)
  NProgress.start();
  store.commit('updateLoadingStatus', {isLoading: true});
  store.commit('SET_FULLPATH',to.path);
  
  // >>>>>>>>>>>>>>>>>> 动态路由控制   >>>>>>>>>>>>>>>>>>>>>>>>>
  let index = -1;
  for(let i = 0; i < routeList.length; i++) {
    if(routeList[i].name == to.name) {
      index = i;
      break;
    }
  }
  if (index !== -1){//如果存在路由列表，则把之后的路由都删掉
    //console.log(">>>>>>>>>>>>>>>如果存在路由列表，则把之后的路由都删掉")
    routeList.splice(index + 1,routeList.length - index - 1);
  } else{//如果不存在
    console.log('to.rank>>>>>',to.meta.rank);
    console.log('from.rank>>>>',from.meta.rank);
    if(to.meta.name !== '登录'){
      if(to.meta.rank === from.meta.rank){
        //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>同级别跳转');
        routeList[routeList.length-1] = {"name" : to.name,"path" : to.fullPath};
      }else if(to.meta.rank< from.meta.rank){
        // routeList.splice(to.meta.rank-1,routeList.length - index - 1);
        //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>返回上一级');
        routeList.splice(to.meta.rank-1,routeList.length - index - 1);
        routeList.push({"name" : to.name,"path" : to.fullPath});
      }else{
        //console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>跳转下一级别');
        routeList.push({"name" : to.name,"path" : to.fullPath});
      }
    }
  }
  //console.log('routeList>>>',routeList)
  to.meta.routeList = routeList;
  
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
  //if (getToken()){ //有 token
  if (true){ //有 token
  //if (true){ //有 token
    if (to.path === '/cdm/cdm_cms/login') {
      console.warn('直接跳转登录页面不需要 role 权限');
      next();
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {//未获得 role 未登录
        console.warn('未缓存role 请求 role 权限');
        //请求获取 role
        store.dispatch('getRole').then(res =>{
          console.warn("role权限",res);
          if(res.error_code === 0){
            //获取 role 成功(表名已经登录) 直接跳转相应页面
            console.warn('获取role权限成功直接跳转');
            if (to.matched.length ===0) {//如果未匹配到路由
              //如果上级也未匹配到路由则跳转404页面，如果上级能匹配到则转上级路由
              from.name ? next({ name:from.name }) : next('/cdm/cdm_cms/404');
            } else {
              next();
            }
          }else{
            console.warn('获取role权限失败跳转登录页面 重新登录');
            console.log('error_msg',res.error_msg);
            console.log('error_code',res.error_code);
            next('/cdm/cdm_cms/login')
          }
        
        }).catch((err)=>{
          //获取 role 失败(表面未登录)跳转登录页面
          console.warn('获取 role 失败 跳转登录页面 重新登录');
          console.log('error_msg',err.error_msg);
          console.log('error_code',err.error_code);
          next('/cdm/cdm_cms/login')
        });
      } else{//以获取 role 已经登录
        console.log('roles.length !== 0');
        if (to.matched.length ===0) {//如果未匹配到路由
          //如果上级也未匹配到路由则跳转404页面，如果上级能匹配到则转上级路由
          from.name ? next({ name:from.name }) : next('/cdm/cdm_cms/404');
        } else {
          next(); //如果匹配到正确跳转
        }
      }
    }
  }else{//没有 token
    if (to.path === '/cdm/cdm_cms/login') {
      next();
    }else{
      next('/cdm/cdm_cms/login');
    }
    NProgress.done();
  }
 

});

router.afterEach(function () {
  store.commit('updateLoadingStatus', {isLoading: false});
  NProgress.done()
  
});
