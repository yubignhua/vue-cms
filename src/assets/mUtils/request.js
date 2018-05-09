import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
import {getToken} from './auth'


const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 3000 // request timeout
});
service.defaults.withCredentials = true;
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
service.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
service.defaults.validateStatus = function (status) {
  return true;
};
service.defaults.transformRequest = [function (data) {
  //console.log('qs.stringify(data)',qs.stringify(data))
  //数据序列化
  return qs.stringify(data);
}
];

service.interceptors.request.use((config) => {
  // if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
  //   config.data = qs.stringify(config.data);
  // }
  //config.headers['X-Token'] = '342sfsfd' // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  return config;
},error => {
  console.log(error);
  Promise.reject(error)
});



service.interceptors.response.use(
  response => response,
  error => {
    console.log('net::err' + error);
    Message({
      message: error.message,
      type: 'error',
      duration: 1.5 * 1000
    });
    return Promise.reject(error)
  });




export default service



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//重写 axios

// let ajaxMethod = ['get', 'post'];
// let api = {};
// ajaxMethod.forEach((method)=> {
//   //数组取值的两种方式
//   api[method] = function (uri, data, config) {
//     return new Promise(function (resolve, reject) {
//       service[method](uri, data, config).then((response)=> {
//         /*根据后台数据进行处理
//          *1 code===200   正常数据+错误数据     code!==200   网络异常等//
//         if (response.data.StatusCode) {
//           Message({
//             message: response.data.Message,
//             type: 'error',
//             duration: 5 * 1000
//           });
//         } else {
//           resolve(response);
//         }
//       }).catch((response)=> {
//         //reject response
//       })
//     })
//   }
// });
//


//
// function errorState(response) {
//   store.commit('UPDATE_LOADING',false)  //隐藏loading
//   console.log(response)
//   // 如果http状态码正常，则直接返回数据
//   if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
//     return response
//   }else{
//     Vue.prototype.$msg.alert.show({
//       title: '提示',
//       content: '网络异常'
//     })
//   }
//
// }
//
// function successState(res) {
//   store.commit('UPDATE_LOADING',false) //隐藏loading
//   //统一判断后端返回的错误码
//   if(res.data.errCode == '000002'){
//     Vue.prototype.$msg.alert.show({
//       title: '提示',
//       content: res.data.errDesc||'网络异常',
//       onShow () {
//       },
//       onHide () {
//         console.log('确定')
//       }
//     })
//   }else if(res.data.errCode != '000002'&&res.data.errCode != '000000') {
//     Vue.prototype.$msg.alert.show({
//       title: '提示',
//       content: res.data.errDesc||'网络异常',
//       onShow () {
//
//       },
//       onHide () {
//         console.log('确定')
//       }
//     })
//   }
// }
//
//
//
//
//
// const httpServer = (opts, data) => {
//
//   let Public = { //公共参数
//     //'srAppid': ""
//   };
//
//   let httpDefaultOpts = { //http默认配置
//     method:opts.method,
//     url: opts.url,
//     timeout: 10000,
//     params:Object.assign(Public, data),
//     data:qs.stringify(Object.assign(Public, data)),
//     headers: opts.method=='get'?{
//       'X-Requested-With': 'XMLHttpRequest',
//       "Accept": "application/json",
//       "Content-Type": "application/json; charset=UTF-8"
//     }:{
//       'X-Requested-With': 'XMLHttpRequest',
//       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//     }
//   };
//
//   if(opts.method=='get'){
//     delete httpDefaultOpts.data
//   }else{
//     delete httpDefaultOpts.params
//   }
//
//   let promise = new Promise(function(resolve, reject) {
//     service(httpDefaultOpts).then(
//       (res) => {
//         successState(res)
//         resolve(res)
//       }
//     ).catch(
//       (response) => {
//         errorState(response)
//         reject(response)
//       }
//     )
//
//   });
//   return promise
// }
//
// export default httpServer


