import request from '@/utils/request'

// 查询操作日志列表
export function list(query) {
  return request({
    url: '/sysOperLog/page',
    method: 'get',
    params: query
  })
}

// 删除操作日志
export function delOperlog(operId) {
  return request({
    url: '/sysOperLog/removeBatch/' + operId,
    method: 'delete'
  })
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: '/monitor/operlog/clean',
    method: 'delete'
  })
}
