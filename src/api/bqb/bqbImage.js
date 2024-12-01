import request from '@/utils/request'

// 查询表情包图片列表
export function listBqbImage(query) {
  return request({
    url: '/bqb/bqbImage/list',
    method: 'get',
    params: query
  })
}

// 查询表情包图片详细
export function getBqbImage(imageId) {
  return request({
    url: '/bqb/bqbImage/' + imageId,
    method: 'get'
  })
}

// 新增表情包图片
export function addBqbImage(data) {
  return request({
    url: '/bqb/bqbImage',
    method: 'post',
    data: data
  })
}

// 修改表情包图片
export function updateBqbImage(data) {
  return request({
    url: '/bqb/bqbImage',
    method: 'put',
    data: data
  })
}

// 删除表情包图片
export function delBqbImage(imageId) {
  return request({
    url: '/bqb/bqbImage/' + imageId,
    method: 'delete'
  })
}


// 删除表情包图片以及云服务
export function delBqb(imageId) {
  return request({
    url: '/bqb/bqbImage/remove/' + imageId,
    method: 'delete'
  })
}