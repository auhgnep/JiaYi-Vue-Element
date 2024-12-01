import request from '@/utils/request'

// 查询参数列表
export function listConfig(query) {
  return request({
    url: '/sysConfig/page',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getConfig(configId) {
  return request({
    url: '/sysConfig/' + configId,
    method: 'get'
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return request({
    // url: '/system/config/configKey/' + configKey,
    url: '/sysConfig/configKey/' + configKey,
    method: 'get'
  })
}

// 新增参数配置
export function addConfig(data) {
  return request({
    url: '/sysConfig',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateConfig(data) {
  return request({
    url: '/sysConfig/' + data.configId,
    method: 'patch',
    data: data
  })
}

// 删除参数配置
export function delConfig(configId) {
  return request({
    url: '/sysConfig/batch/' + configId,
    method: 'delete'
  })
}

// 刷新参数缓存
export function refreshCache() {
  return request({
    url: '/system/config/refreshCache',
    method: 'delete'
  })
}