import request from '@/utils/request'

export function getOutfits(params) {
  return request({
    url: '/api/outfits',
    method: 'get',
    params
  })
}

export function getOutfit(id) {
  return request({
    url: '/api/outfits/' + id,
    method: 'get'
  })
}

export function addOutfit(data) {
  return request({
    url: '/api/outfits',
    method: 'post',
    data
  })
}

export function putOutfit(id, data) {
  return request({
    url: '/api/outfits/' + id,
    method: 'put',
    data
  })
}

export function delOutfit(id) {
  return request({
    url: '/api/outfits/' + id,
    method: 'delete'
  })
}
