/**
 * 放置全局 action
 */

import request from '../assets/mUtils/request'
//登录
const LOGIN = '/cdm/accounts/pc/login';
//登出
const LOGINOUT ='/cdm/accounts/logout';
//获取医生列表
const GETDOCLIST = '/cdm/doctor/check_list';
//获取医助列表
const GETASSISMENTLIST = '/cdm/assistant/check_list';
//获取角色
const GETROLE = '/cdm/accounts/role';
//
const HELLO = '/cdm/hello/';

import {setToken, removeToken } from '../assets/mUtils/auth'

export default {
  /**
   * 登录获取用户基本信息
   * @param commit
   * @param userInfo
   */
  async getUerInfo({commit},userInfo){
    let account = userInfo.account.trim();
    let password = userInfo.pass.trim();
    const loginData = await request.post(LOGIN,{cellphone:account,verify_code:password});
    console.log('loginData',loginData);
    loginData.data.role && commit("SET_ROLE",loginData.data.role);
    loginData.data.user_name && commit("SET_NAME",loginData.data.user_name);
    //loginData.data.token && commit("SET_TOKEN",loginData.data.token);
    //setToken(loginData.data.token);
    return loginData.data;
  },
  /**
   * 登出
   * @param commit
   */
  async loginOut({commit}){
    const loginState = await request.get(LOGINOUT);
     if(loginState){
      commit('SET_NAME', '');
      commit('CLEAR_ROLE');
      commit('SET_TOKEN', '');
       //removeToken()
     };
     return loginState.data
  },
  
  /**
   * 获取可服务的医生列表
   * @param commit
   * @param state
   */
  async getDoctorList({commit}){
    const docList = await request.post(GETDOCLIST);
    commit('SET_DOC_LIST',docList.data.doctor_list);
    
  },
  /**
   * 获取可服务医助列表
   * @param commit
   */
  async getAssistentListList({commit}){
    const assistentList = await request.get(GETASSISMENTLIST);
    commit('SET_ASSISTENT_LIST',assistentList.data.assistant_list)
  },
  /**
   * 获取用户角色 如果有则表示已经登录 如果没有则表示未登录
   */
  async getRole({commit}){
    const res = await request.get(GETROLE);
    res.data.role && commit('SET_ROLE',res.data.role);
    res.data.user_name && commit('SET_NAME',res.data.user_name);
    return res.data
  }
  
};
