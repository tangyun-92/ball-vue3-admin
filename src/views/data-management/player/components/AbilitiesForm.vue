/*
 * @Author: 唐云
 * @Date: 2021-08-25 09:56:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-26 16:28:20
 能力值
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
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="综合能力" prop="comprehensive">
            <el-input v-model="formData.comprehensive" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="速度" prop="speed">
            <el-input v-model="formData.speed" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="射门" prop="shoot">
            <el-input v-model="formData.shoot" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="传球" prop="pass">
            <el-input v-model="formData.pass" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="盘带" prop="dribbling">
            <el-input v-model="formData.dribbling" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="防守" prop="defend">
            <el-input v-model="formData.defend" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="力量" prop="power">
            <el-input v-model="formData.power" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="传中" prop="cross">
            <el-input v-model="formData.cross" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="头球" prop="heading">
            <el-input v-model="formData.heading" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="短传" prop="short_pass">
            <el-input v-model="formData.short_pass" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="凌空" prop="volley">
            <el-input v-model="formData.volley" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="弧线" prop="arc">
            <el-input v-model="formData.arc" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="任意球" prop="free_kick">
            <el-input v-model="formData.free_kick" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="长传" prop="long_pass">
            <el-input v-model="formData.long_pass" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="控球" prop="ball_control">
            <el-input v-model="formData.ball_control" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="加速" prop="speed_up">
            <el-input v-model="formData.speed_up" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="敏捷" prop="agility">
            <el-input v-model="formData.agility" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="反应" prop="reaction">
            <el-input v-model="formData.reaction" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="平衡" prop="balance">
            <el-input v-model="formData.balance" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="射门力量" prop="shooting_power">
            <el-input v-model="formData.shooting_power" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="弹跳" prop="bounce">
            <el-input v-model="formData.bounce" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="耐力" prop="stamina">
            <el-input v-model="formData.stamina" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="强壮" prop="strong">
            <el-input v-model="formData.strong" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="远射" prop="long_shot">
            <el-input v-model="formData.long_shot" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="侵略性" prop="aggressiveness">
            <el-input v-model="formData.aggressiveness" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="拦截意识" prop="intercept_awareness">
            <el-input v-model="formData.intercept_awareness" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="跑位" prop="positioning">
            <el-input v-model="formData.positioning" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="视野" prop="view">
            <el-input v-model="formData.view" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="点球" prop="penalty_kick">
            <el-input v-model="formData.penalty_kick" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="盯人" prop="marking">
            <el-input v-model="formData.marking" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="抢断" prop="break_off">
            <el-input v-model="formData.break_off" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="铲球" prop="slide_tackle">
            <el-input v-model="formData.slide_tackle" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="鱼跃" prop="m_fish_dive">
            <el-input v-model="formData.m_fish_dive" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手型" prop="m_hand_shape">
            <el-input v-model="formData.m_hand_shape" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开球" prop="m_open_ball">
            <el-input v-model="formData.m_open_ball" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="站位" prop="m_stance">
            <el-input v-model="formData.m_stance" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="反应" prop="m_reaction">
            <el-input v-model="formData.m_reaction" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import {
  defineProps,
  defineExpose,
  onMounted,
  ref
} from 'vue'
import { updatePlayerAbility, getPlayerAbility } from '@/api/data-management/player'
import { ElMessage } from 'element-plus'

const props = defineProps({
  id: {
    type: Number,
    default() {
      return null
    }
  }
})
const formRef = ref(null)
// 表单数据
const formData = ref({
  comprehensive: '',
  speed: '',
  shoot: '',
  pass: '',
  dribbling: '',
  defend: '',
  power: '',
  cross: '',
  heading: '',
  short_pass: '',
  volley: '',
  arc: '',
  free_kick: '',
  long_pass: '',
  ball_control: '',
  speed_up: '',
  agility: '',
  reaction: '',
  balance: '',
  shooting_power: '',
  bounce: '',
  stamina: '',
  strong: '',
  long_shot: '',
  aggressiveness: '',
  intercept_awareness: '',
  positioning: '',
  view: '',
  penalty_kick: '',
  marking: '',
  break_off: '',
  slide_tackle: '',
  m_fish_dive: '',
  m_hand_shape: '',
  m_open_ball: '',
  m_stance: '',
  m_reaction: '',
  id: null
})

onMounted(async () => {
  const res = await getPlayerAbility({
    id: props.id
  })
  if (res.data.records) {
    formData.value = res.data.records
  }
})

// 提交表单
const submit = () => {
  return new Promise((resolve, resject) => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        const res = await updatePlayerAbility({
          ...formData.value,
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
