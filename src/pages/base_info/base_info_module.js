
const SEARCHBASEINFO = '/cdm/user/search/';//查询用户基本信息
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
        query:'',
        count_per_page:20,
        page:1
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
  
  //>>>>>>>>>>>>>>>>>>actions
    actions: {
      /**
       * 查询用户数据
       * @param commit
       * @param name
       * @param phone
       */
      async searchBaseInfo({commit,state},data){
        //console.log('data::::',data)
        commit('SET_QUERY',data.query);
        commit('SET_SEARCH_PAGE',data.page);
        const searchInfo = await request.get(SEARCHBASEINFO,{params:state.searchInfo});
        //console.log('返回用户列表user_list:',searchInfo.data.user_list);
        searchInfo.data.user_list && commit('SAVE_HOME_DATA', searchInfo.data.user_list);
        searchInfo.data.total_count && commit("SAVE_ALL_PAGE_NUM",searchInfo.data.total_count);
        return searchInfo.data;
      }
    },
  
  
  //>>>>>>>>>>>>>.  gettter
    getters: {},
  
 
};
