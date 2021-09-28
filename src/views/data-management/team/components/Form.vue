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
          <el-form-item label="球队名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="英文名" prop="english_name">
            <el-input v-model="formData.english_name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成立时间" prop="setup_time">
            <el-input v-model="formData.setup_time" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="所在地区" prop="area">
            <el-input v-model="formData.area" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市" prop="city">
            <el-input v-model="formData.city" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="球队主场" prop="home_court">
            <el-input v-model="formData.home_court" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="容纳人数" prop="person_num">
            <el-input v-model="formData.person_num" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话" prop="tel">
            <el-input v-model="formData.tel" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="地址" prop="address">
            <el-input v-model="formData.address" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="世界排名" prop="world_ranking">
            <el-input v-model="formData.world_ranking" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总身价" prop="total_value">
            <el-input v-model="formData.total_value" placeholder="请输入"></el-input>
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
import { createOrEditTeam, uploadImage } from '@/api/data-management/team'
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
  }
})

const uploadUrl = window._BASE_CONFIG.baseUrl + '/teams/upload'
const formRef = ref(null)
// 表单数据
const formData = reactive({
  name: '',
  english_name: '',
  setup_time: '',
  area: '',
  city: '',
  home_court: '',
  person_num: '',
  tel: '',
  email: '',
  address: '',
  world_ranking: '',
  total_value: '',
  team_logo: '',
  id: null
})
// 校验规则
const rules = {
  name: [{ required: true, message: '不能为空', trigger: 'blur' }],
  english_name: [{ required: true, message: '不能为空', trigger: 'blur' }]
}

// 位置
const ballParkPlace = computed(() => store.getters.ballParkPlace)
// 惯用脚
const habitFeet = computed(() => store.getters.habitFeet)
// 星级
const starLevel = computed(() => store.getters.starLevel)
// 技术特点
const technicalFeature = computed(() => store.getters.technicalFeature)
// 强弱项
const strongAndWeak = computed(() => store.getters.strongAndWeak)
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
  uploadData.imageUrl = props.data.team_logo
})

// 提交表单
const submit = () => {
  return new Promise((resolve, resject) => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        const res = await createOrEditTeam({
          ...formData,
          team_logo: uploadData.imageUrl
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
