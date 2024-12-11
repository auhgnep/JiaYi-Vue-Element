import request from '@/utils/request'

// 查询菜单列表
export function listMenu(query) {
  return request({
    url: '/sysMenu/list',
    method: 'get',
    params: query
  })
}

// 查询菜单详细
export function getMenu(menuId) {
  return request({
    url: '/sysMenu/get/' + menuId,
    method: 'get'
  })
}

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: '/sysMenu/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  return request({
    // url: '/system/menu/roleMenuTreeselect/' + roleId,
    url: '/sysMenu/treeselect',
    method: 'get'
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: '/sysMenu',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: '/sysMenu/update/' + data.menuId,
    method: 'patch',
    data: data
  })
}

// 删除菜单
export function delMenu(menuId) {
  return request({
    url: '/sysMenu/batch/' + menuId,
    method: 'delete'
  })
}
