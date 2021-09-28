/*
 * @Author: 唐云
 * @Date: 2021-08-23 13:29:23
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-28 10:48:06
 * 教练管理
 */
import request from '@/utils/request'

/**
 * 获取教练列表
 * @param {*} data
 * @returns
 */
export function getCoachList(data) {
  return request({
    url: '/coachs/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新教练
 * @param {*} data
 * @returns
 */
export function createOrEditCoach(data) {
  return request({
    url: '/coachs/update',
    method: 'post',
    data
  })
}

/**
 * 队徽上传
 * @param {*} data
 * @returns
 */
export function uploadImage(data) {
  return request({
    url: '/coachs/upload',
    method: 'post',
    data
  })
}

/**
 * 删除教练
 * @param {*} data
 * @returns
 */
export function delCoach(data) {
  return request({
    url: '/coachs/delete',
    method: 'post',
    data
  })
}

/**
 * 获取教练执教经历
 * @param {*} data
 * @returns
 */
export function getCoachExperience(data) {
  return request({
    url: '/coachs/findCoachExperience',
    method: 'post',
    data
  })
}
/**
 * 更新教练执教经历
 * @param {*} data
 * @returns
 */
export function updateCoachExperience(data) {
  return request({
    url: '/coachs/updateCoachExperience',
    method: 'post',
    data
  })
}
/**
 * 删除教练执教经历
 * @param {*} data
 * @returns
 */
export function deleteCoachExperience(data) {
  return request({
    url: '/coachs/deleteCoachExperience',
    method: 'post',
    data
  })
}

/**
 * 获取教练荣誉记录
 * @param {*} data
 * @returns
 */
export function getCoachHonor(data) {
  return request({
    url: '/coachs/findCoachHonor',
    method: 'post',
    data
  })
}
/**
 * 更新教练荣誉记录
 * @param {*} data
 * @returns
 */
export function updateCoachHonor(data) {
  return request({
    url: '/coachs/updateCoachHonor',
    method: 'post',
    data
  })
}
/**
 * 删除教练荣誉记录
 * @param {*} data
 * @returns
 */
export function deleteCoachHonor(data) {
  return request({
    url: '/coachs/deleteCoachHonor',
    method: 'post',
    data
  })
}
