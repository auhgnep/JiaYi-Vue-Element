import request from '@/utils/request'

// 查询字典数据列表
export function listData(query) {
  return request({
    url: '/sysDictData/page',
    method: 'get',
    params: query
  })
}

// 查询字典数据详细
export function getData(dictCode) {
  return request({
    url: '/sysDictData/get/' + dictCode,
    method: 'get'
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: '/sysDictData/list?dictType=' + dictType,
    method: 'get'
  })
}

// 新增字典数据
export function addData(data) {
  return request({
    url: '/sysDictData',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateData(data) {
  return request({
    url: '/sysDictData/update/' + data.dictCode,
    method: 'patch',
    data: data
  })
}

// 删除字典数据
export function delData(dictCode) {
  return request({
    url: '/sysDictData/batch/' + dictCode,
    method: 'delete'
  })
}
