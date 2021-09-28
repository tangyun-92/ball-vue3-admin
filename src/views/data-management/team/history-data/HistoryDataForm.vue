/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-28 11:03:44
 历史数据Form
 */
<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      class="form-data"
      label-width="100px"
      label-position="right"
      size="small"
      :disabled="status === 'details'"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="时间" prop="time">
            <el-input
              v-model.trim="formData.time"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联赛排名" prop="ranking">
            <el-input
              v-model.trim="formData.ranking"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="积分" prop="integral">
            <el-input
              v-model.trim="formData.integral"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="胜" prop="win">
            <el-input
              v-model.trim="formData.win"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="平局" prop="deuce">
            <el-input
              v-model.trim="formData.deuce"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="负" prop="lose">
            <el-input
              v-model.trim="formData.lose"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="进球" prop="goal">
            <el-input
              v-model.trim="formData.goal"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="失球" prop="fumble">
            <el-input
              v-model.trim="formData.fumble"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="点球" prop="penalty_kick">
            <el-input
              v-model.trim="formData.penalty_kick"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="场均射门" prop="averaging_shot">
            <el-input
              v-model.trim="formData.averaging_shot"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="场均射正" prop="averaging_respectively">
            <el-input
              v-model.trim="formData.averaging_respectively"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="场均传球" prop="averaging_pass">
            <el-input
              v-model.trim="formData.averaging_pass"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="传球成功率" prop="pass_success">
            <el-input
              v-model.trim="formData.pass_success"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="关键传球" prop="key_pass">
            <el-input
              v-model.trim="formData.key_pass"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="抢断" prop="steal">
            <el-input
              v-model.trim="formData.steal"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="拦截" prop="intercept">
            <el-input
              v-model.trim="formData.intercept"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="解围" prop="clearance">
            <el-input
              v-model.trim="formData.clearance"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="犯规" prop="foul">
            <el-input
              v-model.trim="formData.foul"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="黄牌" prop="yellow_card">
            <el-input
              v-model.trim="formData.yellow_card"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="红牌" prop="red_card">
            <el-input
              v-model.trim="formData.red_card"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { defineProps, defineExpose, onMounted, reactive, ref } from 'vue'
import { updateTeamData } from '@/api/data-management/team'
import { ElMessage } from 'element-plus'

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
  }
})
const formRef = ref(null)
// 表单数据
const formData = reactive({
  time: '',
  ranking: '',
  integral: '',
  win: '',
  deuce: '',
  lose: '',
  goal: '',
  fumble: '',
  penalty_kick: '',
  averaging_shot: '',
  averaging_respectively: '',
  averaging_pass: '',
  pass_success: '',
  key_pass: '',
  steal: '',
  intercept: '',
  clearance: '',
  foul: '',
  yellow_card: '',
  red_card: '',
  id: null,
  team_id: null
})

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
        const res = await updateTeamData({
          ...formData,
          team_id: props.id
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
