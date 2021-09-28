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
        <el-col :span="8">
          <el-form-item label="名字" prop="name">
            <el-input v-model="formData.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="英文名" prop="english_name">
            <el-input v-model="formData.english_name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="国籍" prop="nation_id">
            <el-select
              v-model="formData.nation_id"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in nationList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生日" prop="birthday">
            <el-date-picker
              v-model="formData.birthday"
              type="date"
              placeholder="选择日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="formData.age" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="合同到期" prop="contract_expire">
            <el-date-picker
              v-model="formData.contract_expire"
              type="date"
              placeholder="选择日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 图片上传 -->
      <div class="img-upload">
        <el-form-item label="队徽" prop="image">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
            :headers="{ Authorization: 'Bearer ' + token }"
          >
            <img v-if="uploadData.imageUrl" :src="uploadData.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import {
  computed,
  defineProps,
  defineExpose,
  onMounted,
  reactive,
  ref
} from 'vue'
import { createOrEditCoach, uploadImage } from '@/api/data-management/coach'
import { ElMessage } from 'element-plus'
import useUploadHooks from '@/hooks/useUploadHooks'
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
  nation: {
    type: Array,
    default() {
      return []
    }
  },
  team: {
    type: Array,
    default() {
      return []
    }
  }
})

const uploadUrl = window._BASE_CONFIG.baseUrl + '/coachs/upload'
const formRef = ref(null)
// 表单数据
const formData = reactive({
  name: '',
  english_name: '',
  team_id: '',
  nation_id: '',
  birthday: '',
  age: '',
  contract_expire: '',
  avatar: '',
  id: null
})
// 校验规则
const rules = {
  name: [{ required: true, message: '不能为空', trigger: 'blur' }],
  english_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
  team_id: [{ required: true, message: '不能为空', trigger: 'change' }],
  nation_id: [{ required: true, message: '不能为空', trigger: 'change' }]
}

// 国籍列表
const nationList = computed(() => props.nation)
// 球队列表
const teamList = computed(() => props.team)

const {
  token,
  uploadChange,
  uploadRemove,
  uploadSuccess,
  beforeUpload,
  uploadExceed,
  uploadData,
  submitUpload,
  upload
} = useUploadHooks({ reqFn: uploadImage })

onMounted(() => {
  Object.keys(formData).forEach((key) => {
    formData[key] = props.data[key]
  })
  uploadData.imageUrl = props.data.avatar
})

// 提交表单
const submit = () => {
  return new Promise((resolve, resject) => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        const res = await createOrEditCoach({
          ...formData,
          avatar: uploadData.imageUrl
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
.dynamic-item {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .el-input {
    width: 280px;
  }
}

.avatar-uploader-icon {
  width: 148px;
  height: 148px;
  line-height: 148px;
}

.upload-to {
  margin: 20px 0 0 0;
}
</style>
