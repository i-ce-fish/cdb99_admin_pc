import request from '@/utils/request'

export function getOrders(params) {
  return request({
    url: '/api/orders',
    method: 'get',
    params
  })
}

export function getOrder(id) {
  return request({
    url: '/api/orders/' + id,
    method: 'get'
  })
}

export function addOrder(data) {
  return request({
    url: '/api/orders',
    method: 'post',
    data
  })
}

export function putOrder(id, data) {
  return request({
    url: '/api/orders/' + id,
    method: 'put',
    data
  })
}

export function delOrder(id) {
  return request({
    url: '/api/orders/' + id,
    method: 'delete'
  })
}
