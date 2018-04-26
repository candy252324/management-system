import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}

export function submitForm(data) {
  return request({
    url: '/user/submit',
    method: 'post',
    data
  })
}

export function delItem(data) {
  return request({
    url: '/user/del',
    method: 'post',
    data
  })
}
export function changePsw(data) {
  return request({
    url: '/user/psw',
    method: 'post',
    data
  })
}
export function getTreeOptions(params) {
  return request({
    url: '/user/treeOptions',
    method: 'get',
    params
  })
}

