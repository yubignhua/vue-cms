/**
 * Created by yubh on 2018/3/10.
 */
import {
  ADD_DATALIST,
  CHANGENAMW,
} from '../../../store/mutation-types';
import Axios from 'axios';

export default {
  state: {
    teamName: '春夜医生团队',
    teamList: ['张三', '李四', '王五'],
    hosp: '燕达医院',
    count: 0,
    dataList: [],
  },
  mutations: {
    [ADD_DATALIST](state, { value }) {
      state.teamList = [...state.teamList, value];
    },
    [CHANGENAMW](state, name) {
      state.hosp = name;
    },
    UPDATA_DATA(state, data) {
      state.dataList = data;
    },
  },
  actions: {
    getHomeDate({ commit }) {
      Axios.get('/cyhospital/weihospital/yanda/clinicIndex/?is_json=1')
        .then((result) => {
          console.log('result=====', result.data);
          commit('UPDATA_DATA', result.data.data.level_2_list);
        });
    },

  },
  getters: {},
};
