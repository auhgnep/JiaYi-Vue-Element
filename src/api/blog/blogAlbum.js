import request from '@/utils/request'

// 查询博客图片列表
export function listBlogAlbum(query) {
  return request({
    url: '/blog/blogAlbum/list',
    method: 'get',
    params: query
  })
}

// 查询博客图片详细
export function getBlogAlbum(albumId) {
  return request({
    url: '/blog/blogAlbum/' + albumId,
    method: 'get'
  })
}

// 新增博客图片
export function addBlogAlbum(data) {
  return request({
    url: '/blog/blogAlbum',
    method: 'post',
    data: data
  })
}

// 修改博客图片
export function updateBlogAlbum(data) {
  return request({
    url: '/blog/blogAlbum',
    method: 'put',
    data: data
  })
}

// 删除博客图片
export function delBlogAlbum(albumId) {
  return request({
    url: '/blog/blogAlbum/' + albumId,
    method: 'delete'
  })
}
