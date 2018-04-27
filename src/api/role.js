import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/role/list',
    method: 'get',
    params
  })
}
export function submitForm(data) {
  return request({
    url: '/role/submit',
    method: 'post',
    data
  })
}
export function delItem(data) {
  return request({
    url: '/role/del',
    method: 'post',
    data
  })
}
export function getOptions(params) {
  return request({
    url: '/role/options',
    method: 'get',
    params
  })
}
