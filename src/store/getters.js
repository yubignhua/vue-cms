/**
 * Created by yubh on 2018/3/10.
 */
export default{
  avatar: state => state.$userInfo.avatar,
  //用户名称
  name: state => state.$userInfo.name,
  //角色
  roles: state => state.$userInfo.roles,
  //路径
  fullPath: state => state.$fullpath,
  //医生列表
  docList:state => state.$docList,
  //医助列表
  assistentList:state => state.$assistentList,
  //患者 id
  patientId:state => state.$curPatientId,
  patientInfo:state => state.$curPatientInfo,
  //token
  token: state => state.$userInfo.token,
}
