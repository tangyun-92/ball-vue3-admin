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
          <el-form-item label="姓名" prop="name">
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
          <el-form-item label="球衣号码" prop="uniform_number">
            <el-input v-model="formData.uniform_number" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身高" prop="high">
            <el-input v-model="formData.high" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="体重" prop="weight">
            <el-input v-model="formData.weight" placeholder="请输入"></el-input>
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
          <el-form-item label="位置" prop="position">
            <el-select
              v-model="formData.position"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in ballParkPlace"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="惯用脚" prop="feet">
            <el-select
              v-model="formData.feet"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in habitFeet"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="逆足能力" prop="inverse_enough">
            <el-select
              v-model="formData.inverse_enough"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in starLevel"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="花式技巧" prop="fancy_tricks">
            <el-select
              v-model="formData.fancy_tricks"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in starLevel"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="国际声望" prop="international_reputation">
            <el-select
              v-model="formData.international_reputation"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in starLevel"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身价" prop="price">
            <el-input v-model="formData.price" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
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
      <el-row>
        <el-col :span="8">
          <el-form-item label="技术特点" prop="technical_feature">
            <el-select
              v-model="formData.technical_feature"
              placeholder="请选择"
              clearable
              filterable
              multiple
            >
              <el-option
                v-for="item in technicalFeature"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="强项" prop="strong_point">
            <el-select
              v-model="formData.strong_point"
              placeholder="请选择"
              clearable
              filterable
              multiple
            >
              <el-option
                v-for="item in strongAndWeak"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="弱项" prop="weak_point">
            <el-select
              v-model="formData.weak_point"
              placeholder="请选择"
              clearable
              filterable
              multiple
            >
              <el-option
                v-for="item in strongAndWeak"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 图片上传 -->
      <div class="img-upload">
        <el-form-item label="头像" prop="image">
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

<script>
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref
} from 'vue'
import { createOrEditPlayer, uploadImage } from '@/api/player/info'
import { ElMessage } from 'element-plus'
import useUploadHooks from '@/hooks/useUploadHooks'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PlayerForm',
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
  },
  setup(props) {
    const store = useStore()
    const uploadUrl = window._BASE_CONFIG.baseUrl + '/players/upload'
    const formRef = ref(null)
    // 表单数据
    const formData = reactive({
      name: '',
      english_name: '',
      avatar: '',
      team_id: null,
      nation_id: null,
      uniform_number: '',
      high: '',
      weight: '',
      birthday: '',
      age: '',
      position: '',
      feet: '',
      inverse_enough: null,
      fancy_tricks: null,
      international_reputation: null,
      price: '',
      contract_expire: '',
      technical_feature: '',
      strong_point: '',
      weak_point: '',
      id: null
    })
    // 校验规则
    const rules = {
      name: [{ required: true, message: '不能为空', trigger: 'blur' }],
      english_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
      nation_id: [{ required: true, message: '不能为空', trigger: 'change' }],
      team_id: [{ required: true, message: '不能为空', trigger: 'change' }],
      position: [{ required: true, message: '不能为空', trigger: 'change' }],
      feet: [{ required: true, message: '不能为空', trigger: 'change' }],
      inverse_enough: [
        { required: true, message: '不能为空', trigger: 'change' }
      ],
      fancy_tricks: [
        { required: true, message: '不能为空', trigger: 'change' }
      ],
      international_reputation: [
        { required: true, message: '不能为空', trigger: 'change' }
      ],
      price: [{ required: true, message: '不能为空', trigger: 'blur' }]
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

    // 国籍列表
    const nationList = computed(() => props.nation)
    // 球队列表
    const teamList = computed(() => props.team)

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
            const res = await createOrEditPlayer({
              ...formData,
              // inverse_enough: Number(formData.inverse_enough),
              // fancy_tricks: Number(formData.fancy_tricks),
              // international_reputation: Number(formData.international_reputation),
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

    return {
      rules,
      submit,
      formData,
      formRef,
      nationList,
      teamList,
      token,
      uploadSuccess,
      beforeUpload,
      uploadData,
      uploadExceed,
      submitUpload,
      upload,
      uploadChange,
      uploadRemove,
      ballParkPlace,
      habitFeet,
      starLevel,
      technicalFeature,
      strongAndWeak,
      uploadUrl
    }
  }
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
