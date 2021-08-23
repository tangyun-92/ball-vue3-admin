import { ElMessage } from 'element-plus'

const state = {
  dictList: '' // 字典列表
}

const mutations = {
  SET_DICT_LIST(state, data) {
    state.dictList = data
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
