/**
 * Created by yubh on 2018/4/2.
 */
// const SEARCHBASEINFO = '/cdm/service/search';//查询服务信息列表
// import request from '../../assets/mUtils/request'
import {searchSeviceData} from '../../service/api'

export default {
  namespaced: true,
  state: {
    //用户信息列表
    userInfoList: [],
    //总页数
    allPageNum:0,
    //当前页
    curPage:1,
    //查询信息
    searchInfo:{
      query:'',
      count_per_page:20,
      page:1,
      service_status:2,
      service_type:1
    }
  },
  mutations: {
    ['SAVE_HOME_DATA'](state, list) {
      state.userInfoList = list;
    },
    ['SAVE_ALL_PAGE_NUM'](state,allPage){
      state.allPageNum = allPage;
    },
    ["CHANGE_PAGE"](state,curPage){
      state.curPage = curPage
    },
    ['SET_QUERY'](state,query){
      state.searchInfo.query = query;
    },
    ['SET_SEARCH_PAGE'](state,curPage){
      state.searchInfo.page = curPage;
      
    }
  },
  
  
  actions: {
    /**
     * 查询用户数据
     * @param commit
     * @param name
     * @param phone
     */
    async searchBaseInfo({commit,state},data){
      commit('SET_QUERY',data.query);
      commit('SET_SEARCH_PAGE',data.curPage);
      //const searchInfo = await request.get(SEARCHBASEINFO,{params:state.searchInfo});
      const searchInfo = await searchSeviceData(state);
      searchInfo.data.total_count && commit('SAVE_ALL_PAGE_NUM',searchInfo.data.total_count);
      searchInfo.data.service_list && commit('SAVE_HOME_DATA', searchInfo.data.service_list);
      return searchInfo.data;
    }
  },
  
  //getter
  getters: {},
  
  
};
