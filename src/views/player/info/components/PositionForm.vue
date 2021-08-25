/*
 * @Author: 唐云
 * @Date: 2021-08-25 09:56:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-25 11:29:25
 位置
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
        <el-col :span="8">
          <el-form-item label="中锋" prop="CF">
            <el-input v-model="formData.CF" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="左边锋" prop="LW">
            <el-input v-model="formData.LW" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="右边锋" prop="RW">
            <el-input v-model="formData.RW" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="左中场" prop="LM">
            <el-input v-model="formData.LM" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="右中场" prop="RM">
            <el-input v-model="formData.RM" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="影锋" prop="SF">
            <el-input v-model="formData.SF" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="前腰" prop="AMF">
            <el-input v-model="formData.AMF" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="中前卫" prop="CMF">
            <el-input v-model="formData.CMF" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="后腰" prop="DM">
            <el-input v-model="formData.DM" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="左翼卫" prop="WL">
            <el-input v-model="formData.WL" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="右翼卫" prop="WR">
            <el-input v-model="formData.WR" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="左后卫" prop="LB">
            <el-input v-model="formData.LB" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="右后卫" prop="RB">
            <el-input v-model="formData.RB" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="中后卫" prop="CB">
            <el-input v-model="formData.CB" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="门将" prop="GK">
            <el-input v-model="formData.GK" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref
} from 'vue'
import { updatePlayerAbility, getPlayerPosition } from '@/api/player/info'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'PositionForm',
  props: {
    id: {
      type: Number,
      default() {
        return null
      }
    }
  },
  setup(props) {
    const formRef = ref(null)
    // 表单数据
    const formData = ref({
      CF: '',
      LW: '',
      RW: '',
      LM: '',
      RM: '',
      SF: '',
      AMF: '',
      CMF: '',
      DM: '',
      WL: '',
      WR: '',
      LB: '',
      RB: '',
      CB: '',
      GK: '',
      id: null
    })

    onMounted(async () => {
      const res = await getPlayerPosition({
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
            const res = await getPlayerPosition({
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

    return {
      submit,
      formData,
      formRef
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
