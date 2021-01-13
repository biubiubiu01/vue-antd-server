const { request } = require('@/utils/request');

/**
 * @description 获取用户列表
 * @param {string}  role
 * @param {string}  username
 * @param {string}  startTime
 * @param {string}  endTime
 * @param {string}  page
 * @param {string}  size
 * @returns {Object} table
 */

export function getUserTable(data) {
  return request.post('/userManage/userTable', data);
}

/**
 * @description 删除当前列
 * @param {string}  id
 * @returns {}
 */

export function deleteTable(data) {
  return request.post('/userManage/deleteTable', data);
}

/**
 * @description 修改
 * @param {string}  id
 * @param {string}  role
 * @param {string}  username
 * @param {string}  password
 * @param {string}  text
 * @returns {}
 */

export function editTable(data) {
  return request.post('/userManage/editUser', data);
}

/**
 * @description 新增
 * @param {string}  role
 * @param {string}  username
 * @param {string}  password
 * @param {string}  text
 * @returns {}
 */

export function addTable(data) {
  return request.post('/userManage/addUser', data);
}

/**
 * @description 导出为excel
 * @param {string}  role
 * @param {string}  username
 * @param {string}  password
 * @param {string}  text
 * @returns {}
 */

export function exportUser(data) {
  return request.post('/userManage/exportUser', data);
}
