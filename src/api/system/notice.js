import request from '@/utils/request'

// 查询公告列表
export function listNotice(query) {
  return request({
    url: '/sysNotice/page',
    method: 'get',
    params: query
  })
}

// 查询公告详细
export function getNotice(noticeId) {
  return request({
    url: '/sysNotice/get/' + noticeId,
    method: 'get'
  })
}

// 新增公告
export function addNotice(data) {
  return request({
    url: '/sysNotice',
    method: 'post',
    data: data
  })
}

// 修改公告
export function updateNotice(data) {
  return request({
    url: '/sysNotice/update/' + data.noticeId,
    method: 'patch',
    data: data
  })
}

// 删除公告
export function delNotice(noticeId) {
  return request({
    url: '/sysNotice/removeBatch/' + noticeId,
    method: 'delete'
  })
}
