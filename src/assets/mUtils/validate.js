/**
 * Created by yubh on 2018/3/27.
 */
//电话校验
function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
};

//验证帐号是否合法
//验证规则：字母、数字、下划线组成，字母开头，4-16位。
const checkAccount = str => {
  const re = /^[a-zA-z]\w{3,15}$/;
  return re.test(str)
}




export const validPhone = (rule, value,callback)=>{
  if (!value){
    callback(new Error('请输入电话号码'))
  }else  if (!isvalidPhone(value)){
    callback(new Error('请输入正确的11位手机号码'))
  }else {
    callback()
  }
}


export const validateAccount = (rule, value, callback) => {
  console.log("value:::::",value)
  if (value === '') {
    callback(new Error('请输入账号'));
  } else {
    if (!(checkAccount(value))) {
      callback(new Error('请输入正确格式的账号'))
    }
    callback();
  }
};

export const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  }
  callback();
};
