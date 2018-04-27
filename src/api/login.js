import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/token',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: '/login/logout',
    method: 'post',
    data
  })
}

export function getUserInfo(params) {
  return request({
    url: '/login/info',
    method: 'get',
    params
  })
}



