import request from '@/utils/request'

export function id2name(params) {
  return request({
    url: '/ClientsData/GetClientsDataJson',
    method: 'get',
    params
  })
}
