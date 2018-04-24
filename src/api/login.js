import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Login/Login',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: '/Login/Logout',
    method: 'post',
    data
  })
}

export function getUserInfo(params) {
  return request({
    url: '/Login/UserInfo',
    method: 'get',
    params
  })
}



