/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-26 17:27:31
 转会记录Form
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
        <el-date-picker
          v-model="formData.time"
          type="month"
          placeholder="请选择"
          format="YYYY.MM"
          value-format="YYYY.MM"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="转出球队" prop="old_team_id">
        <el-select
          v-model="formData.old_team_id"
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
      <el-form-item label="转入球队" prop="new_team_id">
        <el-select
          v-model="formData.new_team_id"
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
      <el-form-item label="价格" prop="price">
        <el-input v-model.trim="formData.price" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="转会类型" prop="transfer_type">
        <el-select
          v-model="formData.transfer_type"
          placeholder="请选择"
          clearable
          filterable
        >
          <el-option
            v-for="item in transferType"
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
import { defineProps, defineExpose, onMounted, reactive, ref, computed } from 'vue'
import { updatePlayerTransfer } from '@/api/data-management/player'
import { ElMessage } from 'element-plus'
import { whether } from '@/constants/dictionary'
import { useStore } from 'vuex'

const store = useStore()

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
  old_team_id: '',
  new_team_id: '',
  price: '',
  transfer_type: '',
  id: null,
  player_id: null
})
// 校验规则
const rules = {
  price: [{ required: true, message: '不能为空', trigger: 'blur' }],
  new_team_id: [{ required: true, message: '不能为空', trigger: 'change' }],
  transfer_type: [{ required: true, message: '不能为空', trigger: 'change' }]
}

// 转会类型
const transferType = computed(() => store.getters.transferType)

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
        const res = await updatePlayerTransfer({
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
