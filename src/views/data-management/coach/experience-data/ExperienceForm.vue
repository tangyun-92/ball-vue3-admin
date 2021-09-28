/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-28 10:57:37
 荣誉记录Form
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
      <el-form-item label="职务" prop="duty">
        <el-input v-model.trim="formData.duty" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="start_time">
        <el-input v-model.trim="formData.start_time" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="结束时间" prop="end_time">
        <el-input v-model.trim="formData.end_time" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { defineProps, defineExpose, onMounted, reactive, ref } from 'vue'
import { updateCoachExperience } from '@/api/data-management/coach'
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
  duty: '',
  start_time: '',
  end_time: '',
  id: null,
  coach_id: null,
  team_id: null
})
// 校验规则
const rules = {
  team_id: [{ required: true, message: '不能为空', trigger: 'change' }],
  duty: [{ required: true, message: '不能为空', trigger: 'blur' }]
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
        const res = await updateCoachExperience({
          ...formData,
          coach_id: props.id
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
