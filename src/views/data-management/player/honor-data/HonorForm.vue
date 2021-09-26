/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-26 17:04:11
 历史数据Form
 */
<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      class="form-data"
      label-width="120px"
      label-position="right"
      size="small"
      :disabled="status === 'details'"
    >
      <el-form-item label="时间" prop="time">
        <el-input v-model.trim="formData.time" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="球队" prop="team_id">
        <el-select
          v-model="formData.team_id"
          placeholder="请选择"
          clearable
          filterable
        >
          <el-option
            v-for="item in teamList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否个人奖项" prop="if_personal">
        <el-select
          v-model="formData.if_personal"
          placeholder="请选择"
          clearable
          filterable
        >
          <el-option
            v-for="item in whether"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="奖项名称" prop="award_code">
        <el-select
          v-model="formData.award_code"
          placeholder="请选择"
          clearable
          filterable
        >
          <el-option
            v-for="item in awardList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { defineProps, defineExpose, onMounted, reactive, ref } from 'vue'
import { updatePlayerHonor } from '@/api/data-management/player'
import { ElMessage } from 'element-plus'
import { whether } from '@/constants/dictionary'

const props = defineProps({
  data: {
    type: Object,
    default() {
      return {}
    }
  },
  status: {
    type: String,
    default: 'create'
  },
  id: {
    type: Number,
    default: null
  },
  awardList: {
    type: Array,
    default() {
      return []
    }
  },
  teamList: {
    type: Array,
    default() {
      return []
    }
  }
})
const formRef = ref(null)
// 表单数据
const formData = reactive({
  time: '',
  team_id: '',
  if_personal: '',
  award_code: '',
  id: null,
  player_id: null
})
// 校验规则
const rules = {
  time: [{ required: true, message: '不能为空', trigger: 'blur' }],
  team_id: [{ required: true, message: '不能为空', trigger: 'change' }],
  if_personal: [{ required: true, message: '不能为空', trigger: 'change' }],
  award_code: [{ required: true, message: '不能为空', trigger: 'change' }]
}

onMounted(() => {
  Object.keys(formData).forEach((key) => {
    formData[key] = props.data[key]
  })
})

// 提交表单
const submit = () => {
  return new Promise((resolve, resject) => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        const res = await updatePlayerHonor({
          ...formData,
          player_id: props.id
        })
        ElMessage.success(res.message)
        resolve(res)
      } else {
        resject('表单验证未通过')
      }
    })
  })
}

defineExpose({
  submit
})
</script>

<style lang='scss' scoped>
</style>
