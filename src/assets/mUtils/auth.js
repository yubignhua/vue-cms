/**
 * Created by yubh on 2018/4/16.
 */
import Cookies from 'js-cookie';

// console.log("HHHHHH",Cookies)
// console.log("HHHHHH",Cookies.get('fksid'))

const TokenKey = 'fksid';

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
