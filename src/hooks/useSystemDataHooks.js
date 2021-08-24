import { getDict } from '@/api/system/dict'
import { useStore } from 'vuex'

export default function () {
  const store = useStore()

  /**
   * 获取基础字典列表
   */
  const getDictList = async () => {
    const res = await getDict()
    store.commit('baseData/SET_DICT_LIST', res.data.records)
  }

  return {
    getDictList
  }
}
