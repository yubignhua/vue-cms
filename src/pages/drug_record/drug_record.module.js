/**
 * Created by yubh on 2018/4/12.
 */
const SETDRUGLIST = '/cdm/user/get_drug_list';//
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
      // role:'assistant'
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
    ['CHANGE_DRUG_STATE'](state,index,value){
      console.log('value:::',value)
      state.userInfoList[index].status = value;
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
      const searchInfo = await request.get(SETDRUGLIST,{params:state.searchInfo});
      searchInfo.data.total_count && commit('SAVE_ALL_PAGE_NUM',searchInfo.data.total_count);
      searchInfo.data.drug_list && commit('SAVE_HOME_DATA', searchInfo.data.drug_list);
    },
    /**
     * 修改用药状态
     * @param index
     * @param dataList
     */
    async changeDrugState({commit,state},data) {
      let dataItem = state.userInfoList[data.index];
      
      // console.log('data',data);
      // console.log('dataItem',dataItem);
      // console.log('record_id',dataItem.record_id);
      let result = await request.post('/cdm/user/drug/stop',{record_id:dataItem.record_id,user_id:data.user_id});
      // if(result.data.error_code === 0){
      //   commit('CHANGE_DRUG_STATE',data.index,data.value);
      // }
      return result.data
    },
  },
  

  
  //getter
  getters: {},
  
  
};
