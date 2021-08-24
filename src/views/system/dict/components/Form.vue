<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      class="form-data"
      label-width="100px"
      label-position="right"
      size="small"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            :label="type === 'dictType' ? '字典类型' : '字典属性'"
            prop="name"
          >
            <el-input
              v-model.trim="formData.name"
              placeholder="请输入"
              size="small"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="type === 'dictType' ? '类型代码' : 'Key值'"
            prop="code"
          >
            <el-input
              v-model.trim="formData.code"
              placeholder="请输入"
              size="small"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="说明" prop="remark">
            <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="2"
              placeholder="请输入"
              size="small"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from '@vue/runtime-core'
import { createOrEditDict } from '@/api/system/dict'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'UserForm',
  props: {
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
    // dictNature 字典属性  dictType 字典类型
    type: {
      type: String,
      default() {
        return 'dictNature'
      }
    },
    // 字典类型的码表代码
    dictTypeCode: {
      type: String,
      default() {
        return ''
      }
    }
  },
  setup(props) {
    const formRef = ref(null)
    // 表单数据
    const formData = reactive({
      name: '',
      code: '',
      remark: '',
      if_parent: '',
      parent_code: '',
      id: null
    })
    // 校验规则
    const rules = {
      name: [{ required: true, message: '不能为空', trigger: 'blur' }],
      code: [{ required: true, message: '不能为空', trigger: 'blur' }]
    }

    onMounted(() => {
      Object.keys(formData).forEach((key) => {
        formData[key] = props.data[key]
      })
      // 新增字典类型时
      if (props.status === 'create' && props.type === 'dictType') {
        formData.parent_code = '0'
        formData.if_parent = '1'
      } else if (props.status === 'create' && props.type === 'dictNature') {
        // 新增字典属性时
        formData.parent_code = props.dictTypeCode
        formData.if_parent = '0'
      }
    })

    // 提交表单
    const submit = () => {
      return new Promise((resolve, resject) => {
        formRef.value.validate(async (valid) => {
          if (valid) {
            const res = await createOrEditDict({
              ...formData
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
      rules,
      submit,
      formData,
      formRef
    }
  }
})
</script>

<style lang='scss' scoped>
</style>
