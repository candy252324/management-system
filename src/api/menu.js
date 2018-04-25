import request from '@/utils/request'
export const permission={
  add:['post,/menu/add'],
  edit:['post,/menu/edit'],
  detail:['get,/menu/theDetails'],
  del:['post,/menu/del'],
}

export function getList(params) {
  return request({
    url: '/menu/list',
    method: 'get',
    params
  })
}
export function getDetail(params) {
  return request({
    url: '/menu/theDetails',
    method: 'get',
    params
  })
}
export function submitForm(data) {
  return request({
    url: '/menu/submit',
    method: 'post',
    data
  })
}
export function delItem(data) {
  return request({
    url: '/menu/del',
    method: 'post',
    data
  })
}
