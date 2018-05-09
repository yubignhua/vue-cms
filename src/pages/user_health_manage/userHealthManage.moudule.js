
const USERBASEINFO = '/api/userInfoList';//用户基本信息列表
const SEARCHBASEINFO = '/cdm/user/search';//查询用户基本信息

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
      name:'',
      cellphone:'',
      countPerPage:20,
      page:''
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
    ['SET_NAEM'](state,name){
      state.searchInfo.name = name;
    },
    ['SET_PHONE'](state,phone){
      state.searchInfo.cellphone = phone
    },
    ['SET_SEARCH_PAGE'](state,curPage){
      state.searchInfo.page = curPage;
      
    }
  },
  
  
  actions: {
    /**
     * 获取用户基本信息列表
     * @param commit
     * @param state
     */
    async getBaseInfo ({commit, state}) {
      if (state.userInfoList.length > 0) return;
      const userInfo = await Axios.get(USERBASEINFO);
      userInfo.data.infoList && commit('SAVE_HOME_DATA', userInfo.data.infoList);
      userInfo.data.allPage && commit("SAVE_ALL_PAGE_NUM",userInfo.data.allPage);
    },
    /**
     * 获取分页用户信息列表
     * @param commit
     * @param page
     */
    async getOtherBaseInfo({commit},page = 1,){
      console.log("page:::",page);
      const userInfo = await Axios.get(USERBASEINFO,{params:{pageNum:page}});
      userInfo.data.infoList && commit('SAVE_HOME_DATA', userInfo.data.infoList);
      userInfo.data.infoList && commit('CHANGE_PAGE',page);
    },
    /**
     * 查询用户数据
     * @param commit
     * @param name
     * @param phone
     */
    async searchBaseInfo({commit,state},data){
      commit('SET_PHONE',data.phone);
      commit('SET_NAEM',data.name);
      commit('SET_SEARCH_PAGE',state.curPage);
      const searchInfo = await Axios.post(SEARCHBASEINFO,state.searchInfo);
      console.log(searchInfo.data.infoList);
      
      searchInfo.data.infoList && commit('SAVE_HOME_DATA', searchInfo.data.infoList);
    }
  },
  getters: {},
  
  
};
