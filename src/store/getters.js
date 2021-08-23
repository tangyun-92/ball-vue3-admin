const getters = {
  token: (state) => state.user.token,
  // 惯用脚
  habitFeet: (state) => {
    const list =
      (state.baseData.dictList.find((item) => item.code === 'gyj') || {})
        .children || []
    return list
  },
  // 场上位置
  ballParkPlace: (state) => {
    const list =
      (state.baseData.dictList.find((item) => item.code === 'wz') || {})
        .children || []
    return list
  },
  // 转会类型
  transferType: (state) => {
    const list =
      (state.baseData.dictList.find((item) => item.code === 'zhlx') || {})
        .children || []
    return list
  },
  // 星级
  starLevel: (state) => {
    const list =
      (state.baseData.dictList.find((item) => item.code === 'star') || {})
        .children || []
    return list
  },
  // 伤病类型
  injuryType: (state) => {
    const list =
      (state.baseData.dictList.find((item) => item.code === 'sblx') || {})
        .children || []
    return list
  },
  // 大洲
  continent: (state) => {
    const list =
      (state.baseData.dictList.find((item) => item.code === 'dz') || {})
        .children || []
    return list
  }
}

export default getters
