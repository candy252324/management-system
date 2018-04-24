import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/Role/Get',
    method: 'get',
    params
  })
}
export function submitForm(data) {
  return request({
    url: '/Role/SubmitForm',
    method: 'post',
    data
  })
}
export function delItem(data) {
  return request({
    url: '/Role/Delete',
    method: 'post',
    data
  })
}
export function getOptions(params) {
  return request({
    url: '/Role/GetOptions',
    method: 'get',
    params
  })
}
