/*
 * @Author: 唐云
 * @Date: 2021-08-23 13:29:23
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-23 13:30:10
 * 字典管理
 */
import request from '@/utils/request'

/**
 * 获取字典列表
 * @param {*} data
 * @returns
 */
export function getDict(data) {
  return request({
    url: '/dicts/list',
    method: 'post',
    data
  })
}

/**
 * 创建/更新字典
 * @param {*} data
 * @returns
 */
export function createOrEditDict(data) {
  return request({
    url: '/dicts/update',
    method: 'post',
    data
  })
}

/**
 * 删除字典
 * @param {*} data
 * @returns
 */
export function delDict(data) {
  return request({
    url: '/dicts/delete',
    method: 'post',
    data
  })
}
