const LOGIN = '/api/logon';
const HELLO = '/cdm/hello'

export default {
  namespaced: true,
  state: {
    userInfo:{
      userId:'',
      userToken:'',
      account:'',//账号
      limit:'',//权限
    },
  },
  getters: {},
  
  mutations: {
    ["SAVEHOMEDATA"](state,map){
      state.userInfo = map;
    }
    
  },
  actions: {
    async login({commit},userInfo){
      let account = userInfo.account.trim();
      const loginData = await Axios.post(LOGIN,{account,passWord:userInfo.passWord});
      //const loginData = await Axios.post(HELLO,{account,passWord:userInfo.passWord});
      loginData.data.userInfo && commit("SAVEHOMEDATA",loginData.data.userInfo);
      console.log('loginData',loginData);
    }
    
    
  },
};
