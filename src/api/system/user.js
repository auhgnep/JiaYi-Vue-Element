import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/personal-backed";

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/sysUser/page',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/sysUser/get/' + parseStrEmpty(userId),
    method: 'get'
  })
}

// 查询用户详细
export function getUserAddInfo() {
  return request({
    url: '/sysUser/addInfo',
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/sysUser',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/sysUser/update/' + data.userId,
    method: 'patch',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: '/sysUser/batch/' + userId,
    method: 'delete'
  })
}

// 用户密码重置
export function resetUserPwd(userId, password) {
  const data = {
    userId,
    password
  }
  return request({
    url: '/sysUser/profile/update/' + userId,
    method: 'patch',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(userId, useFlag) {
  const data = {
    userId,
    useFlag
  }
  return request({
    url: '/sysUser/changeStatus',
    method: 'patch',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/sysUser/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/sysUser/profile/update/' + data.userId,
    method: 'patch',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/sysUser/updatePwd',
    method: 'patch',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/sysUser/profile/avatar',
    method: 'post',
    data: data
  })
}

// 查询授权角色
export function getAuthRole(userId) {
  return request({
    url: '/sysUser/authRole/' + userId,
    method: 'get'
  })
}

// 保存授权角色
export function updateAuthRole(data) {
  return request({
    url: '/sysUser/authRole',
    method: 'patch',
    data: data
  })
}

// 查询部门下拉树结构
export function deptTreeSelect() {
  return request({
    url: '/sysDept/user/deptTree',
    method: 'get'
  })
}
