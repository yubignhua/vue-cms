/**
 * Created by yubh on 2018/3/10.
 */
import { getToken} from '../assets/mUtils/auth'

export default {
  //全局存储用户基本信息
  $userInfo:{
    account:'',//账号
    roles:[],//权限
    user: '',
    status: '',//状态
    code: '',
    token: getToken() || '',
    name: '',//名称
    avatar: '',//头像
    introduction: '',
  },
  //slidebar 导航路径
  $fullpath:'cdm/cdm_cms/layout/base_info',
  //全局存储可用医生列表
  $docList:[],
  //全局存储可用医助列表
  $assistentList:[],
  //存储 健康管理 当前选择的服务患者 id
  $curPatientId:0,
  $curPatientInfo:{}
  
};
