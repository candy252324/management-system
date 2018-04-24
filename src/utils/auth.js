import Cookies from 'js-cookie'

const TokenKey = 'token'
const expires = 30   //30天的有效期

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {expires})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
