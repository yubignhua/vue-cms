// 放置全局mutations
export default {
  ["SET_TOKEN"](state,token){
    state.$userInfo.token = token;
  },
  ["SET_ROLE"](state,roles){
    state.$userInfo.roles = [...roles];
  },
  ["CLEAR_ROLE"](state){
    state.$userInfo.roles = [];
  },
  ["SET_NAME"](state,name){
    state.$userInfo.name = name;
  },
  ["SET_AVATAR"](state,avatar){
    state.$userInfo.avatar = avatar;
  },
  ["SET_FULLPATH"](state,path){
    state.$fullpath = path;
  },
  ['SET_DOC_LIST'](state,list){
    state.$docList = [...list];
  },
  ['SET_ASSISTENT_LIST'](state,list){
    state.$assistentList = [...list]
  },
  ['SET_CUR_PATINET_ID'](state,id){
    state.$curPatientId = id
  },
  ['SET_CUR_PATINET_INFO'](state,map){
    state.$curPatientInfo = map
  }
};

