/*
 * @Author: 唐云
 * @Date: 2021-07-29 10:37:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-26 15:18:55
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
          <el-form-item label="出场" prop="enter_field">
            <el-input
              v-model.trim="formData.enter_field"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="首发" prop="starter">
            <el-input
              v-model.trim="formData.starter"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="场均时间" prop="game_time">
            <el-input
              v-model.trim="formData.game_time"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="进球" prop="goal">
            <el-input
              v-model.trim="formData.goal"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="助攻" prop="assist">
            <el-input
              v-model.trim="formData.assist"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="场均进球" prop="averaging_goal">
            <el-input
              v-model.trim="formData.averaging_goal"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="每球耗时" prop="every_time">
            <el-input
              v-model.trim="formData.every_time"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="被犯规" prop="be_foul">
            <el-input
              v-model.trim="formData.be_foul"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="射门" prop="shoot">
            <el-input
              v-model.trim="formData.shoot"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="射正率" prop="target_rate">
            <el-input
              v-model.trim="formData.target_rate"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="越位" prop="offside">
            <el-input
              v-model.trim="formData.offside"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="关键传球" prop="key_pass">
            <el-input
              v-model.trim="formData.key_pass"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="传球总数" prop="pass_total">
            <el-input
              v-model.trim="formData.pass_total"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="传球成功率" prop="pass_success">
            <el-input
              v-model.trim="formData.pass_success"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="场均抢断" prop="averaging_steal">
            <el-input
              v-model.trim="formData.averaging_steal"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="场均拦截" prop="averaging_intercept">
            <el-input
              v-model.trim="formData.averaging_intercept"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="场均解围" prop="averaging_clearance">
            <el-input
              v-model.trim="formData.averaging_clearance"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="出场时间" prop="playing_time">
            <el-input
              v-model.trim="formData.playing_time"
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
        <el-col :span="8">
          <el-form-item label="黄牌" prop="yellow_card">
            <el-input
              v-model.trim="formData.yellow_card"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
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
import { updatePlayerData } from '@/api/player/info'
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
  enter_field: '',
  starter: '',
  game_time: '',
  goal: '',
  assist: '',
  averaging_goal: '',
  every_time: '',
  be_foul: '',
  shoot: '',
  target_rate: '',
  offside: '',
  key_pass: '',
  pass_total: '',
  pass_success: '',
  averaging_steal: '',
  averaging_intercept: '',
  averaging_clearance: '',
  playing_time: '',
  foul: '',
  yellow_card: '',
  red_card: '',
  id: null,
  player_id: null
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
        const res = await updatePlayerData({
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
