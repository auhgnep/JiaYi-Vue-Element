import request from '@/utils/request'

// 查询角色列表
export function listRole(query) {
  return request({
    url: '/sysRole/page',
    method: 'get',
    params: query
  })
}

// 查询角色列表
export function listRoleAll(query) {
  return request({
    url: '/sysRole/list',
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function getRole(roleId) {
  return request({
    url: '/sysRole/get/' + roleId,
    method: 'get'
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/sysRole',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/sysRole/update/' + data.roleId,
    method: 'patch',
    data: data
  })
}

// 角色数据权限
export function dataScope(data) {
  return request({
    url: '/sysRole/dataScope',
    method: 'patch',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, useFlag) {
  const data = {
    roleId,
    useFlag
  }
  return request({
    url: '/sysRole/changeStatus',
    method: 'patch',
    data: data
  })
}

// 删除角色
export function delRole(roleId) {
  return request({
    url: '/sysRole/batch/' + roleId,
    method: 'delete'
  })
}

// 查询角色已授权用户列表
export function allocatedUserList(query) {
  return request({
    url: '/sysRole/authUser/allocatedList',
    method: 'get',
    params: query
  })
}

// 查询角色未授权用户列表
export function unallocatedUserList(query) {
  return request({
    url: '/sysRole/authUser/unallocatedList',
    method: 'get',
    params: query
  })
}

// 取消用户授权角色
export function authUserCancel(data) {
  return request({
    url: '/sysRole/authUser/cancel',
    method: 'patch',
    data: data
  })
}

// 批量取消用户授权角色
export function authUserCancelAll(data) {
  return request({
    url: '/sysRole/authUser/cancelAll',
    method: 'patch',
    data: data
  })
}

// 授权用户选择
export function authUserSelectAll(data) {
  return request({
    url: '/sysRole/authUser/selectAll',
    method: 'patch',
    data: data
  })
}

// 根据角色ID查询部门树结构
export function deptTreeSelect(roleId) {
  return request({
    url: '/sysRole/deptTree/' + roleId,
    method: 'get'
  })
}
