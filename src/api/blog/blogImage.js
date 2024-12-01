import request from '@/utils/request'

// 查询博客图片列表
export function listBlogImage(query) {
  return request({
    url: '/blog/blogImage/list',
    method: 'get',
    params: query
  })
}

// 查询博客图片详细
export function getBlogImage(imageId) {
  return request({
    url: '/blog/blogImage/' + imageId,
    method: 'get'
  })
}

// 新增博客图片
export function addBlogImage(data) {
  return request({
    url: '/blog/blogImage',
    method: 'post',
    data: data
  })
}

// 修改博客图片
export function updateBlogImage(data) {
  return request({
    url: '/blog/blogImage',
    method: 'put',
    data: data
  })
}

// 删除博客图片
export function delBlogImage(imageId) {
  return request({
    url: '/blog/blogImage/' + imageId,
    method: 'delete'
  })
}

// 删除图片以及云服务
export function delBlog(imageId) {
  return request({
    url: '/blog/blogImage/remove/' + imageId,
    method: 'delete'
  })
}
