import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/Dashboard/Get',
    method: 'get',
    params
  })
}
