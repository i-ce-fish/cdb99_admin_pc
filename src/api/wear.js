import request from '@/utils/request'

export function getWears(params) {
  return request({
    url: '/api/wears',
    method: 'get',
    params
  })
}

export function getWear(id) {
  return request({
    url: '/api/wears/' + id,
    method: 'get'
  })
}

export function addWear(data) {
  return request({
    url: '/api/wears',
    method: 'post',
    data
  })
}

export function putWear(id, data) {
  return request({
    url: '/api/wears/' + id,
    method: 'put',
    data
  })
}

export function delWear(id) {
  return request({
    url: '/api/wears/' + id,
    method: 'delete'
  })
}
