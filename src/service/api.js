/**
 * Created by yubh on 2018/3/15.
 */
import request from '../assets/mUtils/request';

// url
const SEARCH_SERVICE = '/cdm/service/search/';//查询服务列表信息(此接口多个页面公用)

/**
 * 查询服务列表 根据传参数 (service_status) 的不同返回不同的列表
 * @param state
 * @returns {*}
 */
export const searchSeviceData =  (state) => {
  return request.get(SEARCH_SERVICE,{params:state.searchInfo})
};



function param(a) {
  const s = [];
  function add(keyword, valueOrFunction) {
    const value = typeof valueOrFunction === 'function' ? valueOrFunction() : valueOrFunction;
    s[s.length] = `${encodeURIComponent(keyword)}=${encodeURIComponent(value == null ? '' : value)}`;
  }
  const params = Object.entries(a);
  params.forEach(([k, v]) => {
    add(k, v);
  });
  return s.join('&');
}
