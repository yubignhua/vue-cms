/**
 * Created by yubh on 2018/4/12.
 */
const GET_SERVER_LIST = '/cdm/staff/service/search';//查询医助信息
import request from '../../assets/mUtils/request'

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
      count_per_page:20,
      page:1,
      user_id:'',
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
    
    
    //设置查询信息
    ['SET_USER_ID'](state,user_id){
      state.searchInfo.user_id = user_id;
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
      commit('SET_USER_ID',data.user_id);
      commit('SET_SEARCH_PAGE',data.curPage);
      const searchInfo = await request.get(GET_SERVER_LIST,{params:state.searchInfo});
      searchInfo.data.total_count && commit('SAVE_ALL_PAGE_NUM',searchInfo.data.total_count);
      searchInfo.data.service_list && commit('SAVE_HOME_DATA', searchInfo.data.service_list);
      return searchInfo.data
    }
  },
  
  
  
  //getter
  getters: {},
  
  
};
