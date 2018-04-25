import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/buttonManage/list',
    method: 'get',
    params   //菜单id
  })
}
export function getDetail(params) {
  return request({
    url: '/buttonManage/theDetails',
    method: 'get',
    params   //按钮id
  })
}
export function submitForm(data) {
  return request({
    url: '/buttonManage/submit',
    method: 'post',
    data
  })
}
export function delItem(data) {
  return request({
    url: '/buttonManage/del',
    method: 'post',
    data
  })
}
