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
/**
 * 路由登录 角色 权限控制
 */
router.beforeEach((to, from, next) => {
  //alert(to.path)
  NProgress.start();
  store.commit('updateLoadingStatus', {isLoading: true});
  store.commit('SET_FULLPATH',to.path);
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
//测试玩~~~~~
