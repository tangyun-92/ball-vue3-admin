/*
 * @Author: 唐云
 * @Date: 2021-08-23 13:29:23
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-24 11:23:32
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
