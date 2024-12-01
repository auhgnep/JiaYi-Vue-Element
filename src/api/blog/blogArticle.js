import request from '@/utils/request'

// 查询博客文章列表
export function listBlogArticle(query) {
  return request({
    url: '/blog/blogArticle/list',
    method: 'get',
    params: query
  })
}

// 查询博客文章详细
export function getBlogArticle(articleId) {
  return request({
    url: '/blog/blogArticle/' + articleId,
    method: 'get'
  })
}

// 新增博客文章
export function addBlogArticle(data) {
  return request({
    url: '/blog/blogArticle',
    method: 'post',
    data: data
  })
}

// 修改博客文章
export function updateBlogArticle(data) {
  return request({
    url: '/blog/blogArticle',
    method: 'put',
    data: data
  })
}

// 删除博客文章
export function delBlogArticle(articleId) {
  return request({
    url: '/blog/blogArticle/' + articleId,
    method: 'delete'
  })
}
