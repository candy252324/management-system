import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/User/Get',
    method: 'get',
    params
  })
}

export function submitForm(data) {
  return request({
    url: '/User/SubmitForm',
    method: 'post',
    data
  })
}
export function getDetail(params) {
  return request({
    url: '/User/Detail',
    method: 'get',
    params
  })
}

export function delItem(data) {
  return request({
    url: '/User/Delete',
    method: 'post',
    data
  })
}
export function changePsw(data) {
  return request({
    url: '/User/Password',
    method: 'post',
    data
  })
}
// export function getOptions(params) {
//   return request({
//     url: '/User/GetOptions',
//     method: 'get',
//     params
//   })
// }
export function getTreeOptions(params) {
  return request({
    url: '/User/GetTreeOptions',
    method: 'get',
    params
  })
}

