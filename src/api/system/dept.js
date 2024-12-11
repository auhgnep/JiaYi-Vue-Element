import request from '@/utils/request'

// 查询部门列表
export function listDept(query) {
  return request({
    url: '/sysDept/list',
    method: 'get',
    params: query
  })
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId) {
  return request({
    url: '/sysDept/exclude/' + deptId,
    method: 'get'
  })
}

// 查询部门详细
export function getDept(deptId) {
  return request({
    url: '/sysDept/get/' + deptId,
    method: 'get'
  })
}

// 新增部门
export function addDept(data) {
  return request({
    url: '/sysDept',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data) {
  return request({
    url: '/sysDept/update/' + data.deptId,
    method: 'patch',
    data: data
  })
}

// 删除部门
export function delDept(deptId) {
  return request({
    url: '/sysDept/' + deptId,
    method: 'delete'
  })
}
