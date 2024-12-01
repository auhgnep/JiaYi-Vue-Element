import request from '@/utils/request'

// 查询登录日志列表
export function list(query) {
  return request({
    url: '/sysLogininfor/page',
    method: 'get',
    params: query
  })
}

// 删除登录日志
export function delLogininfor(infoId) {
  return request({
    url: '/sysLogininfor/removeBatch/' + infoId,
    method: 'delete'
  })
}

// 解锁用户登录状态
export function unlockLogininfor(userName) {
  return request({
    url: '/sysLogininfor/unlock/' + userName,
    method: 'get'
  })
}

// 清空登录日志
export function cleanLogininfor() {
  return request({
    url: '/sysLogininfor/clean',
    method: 'delete'
  })
}
