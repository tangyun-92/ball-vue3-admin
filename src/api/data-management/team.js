/*
 * @Author: 唐云
 * @Date: 2021-08-23 13:29:23
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-28 09:20:35
 * 球队管理
 */
import request from '@/utils/request'

/**
 * 获取球队列表
 * @param {*} data
 * @returns
 */
export function getTeamList(data) {
  return request({
    url: '/teams/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新球队
 * @param {*} data
 * @returns
 */
export function createOrEditTeam(data) {
  return request({
    url: '/teams/update',
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
    url: '/teams/upload',
    method: 'post',
    data
  })
}

/**
 * 删除球队
 * @param {*} data
 * @returns
 */
export function delTeam(data) {
  return request({
    url: '/teams/delete',
    method: 'post',
    data
  })
}

/**
 * 获取球队历史数据
 * @param {*} data
 * @returns
 */
export function getTeamData(data) {
  return request({
    url: '/teams/findTeamData',
    method: 'post',
    data
  })
}
/**
 * 更新球队历史数据
 * @param {*} data
 * @returns
 */
export function updateTeamData(data) {
  return request({
    url: '/teams/updateTeamData',
    method: 'post',
    data
  })
}
/**
 * 删除球队历史数据
 * @param {*} data
 * @returns
 */
export function deleteTeamData(data) {
  return request({
    url: '/teams/deleteTeamData',
    method: 'post',
    data
  })
}

/**
 * 获取球队荣誉记录
 * @param {*} data
 * @returns
 */
export function getTeamHonor(data) {
  return request({
    url: '/teams/findTeamHonor',
    method: 'post',
    data
  })
}
/**
 * 更新球队荣誉记录
 * @param {*} data
 * @returns
 */
export function updateTeamHonor(data) {
  return request({
    url: '/teams/updateTeamHonor',
    method: 'post',
    data
  })
}
/**
 * 删除球队荣誉记录
 * @param {*} data
 * @returns
 */
export function deleteTeamHonor(data) {
  return request({
    url: '/teams/deleteTeamHonor',
    method: 'post',
    data
  })
}
