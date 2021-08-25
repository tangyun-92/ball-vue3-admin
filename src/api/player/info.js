/*
 * @Author: 唐云
 * @Date: 2021-08-23 13:29:23
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-25 10:40:35
 * 球员信息
 */
import request from '@/utils/request'

/**
 * 获取球员列表
 * @param {*} data
 * @returns
 */
export function getPlayer(data) {
  return request({
    url: '/players/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新球员
 * @param {*} data
 * @returns
 */
export function createOrEditPlayer(data) {
  return request({
    url: '/players/update',
    method: 'post',
    data
  })
}

/**
 * 头像上传
 * @param {*} data
 * @returns
 */
export function uploadImage(data) {
  return request({
    url: '/players/upload',
    method: 'post',
    data
  })
}

/**
 * 删除球员
 * @param {*} data
 * @returns
 */
export function delPlayer(data) {
  return request({
    url: '/players/delete',
    method: 'post',
    data
  })
}

/**
 * 获取球员能力值
 * @param {*} data
 * @returns
 */
export function getPlayerAbility(data) {
  return request({
    url: '/players/findAbility',
    method: 'post',
    data
  })
}

/**
 * 耿勋球员能力值
 * @param {*} data
 * @returns
 */
export function updatePlayerAbility(data) {
  return request({
    url: '/players/updateAbility',
    method: 'post',
    data
  })
}
