import request from '@/utils/request'

export function getActivities(params) {
  return request({
    url: '/api/activities',
    method: 'get',
    params
  })
}

export function getActivity(id) {
  return request({
    url: '/api/activities/' + id,
    method: 'get'
  })
}

export function addActivity(data) {
  return request({
    url: '/api/activities',
    method: 'post',
    data
  })
}

export function putActivity(id, data) {
  return request({
    url: '/api/activities/' + id,
    method: 'put',
    data
  })
}

export function delActivity(id) {
  return request({
    url: '/api/activities/' + id,
    method: 'delete'
  })
}
