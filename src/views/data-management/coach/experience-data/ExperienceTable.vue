/*
 * @Author: 唐云
 * @Date: 2021-07-30 15:11:43
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-28 10:57:56
 荣誉记录
 */
<template>
  <div>
    <el-button
      type="primary"
      size="small"
      plain
      @click="handleCreate"
    >新增</el-button>
    <el-button
      type="danger"
      size="small"
      plain
      @click="
        multipleSelectionHandler({
          operation: '删除',
          reqFn: deleteCoachExperience,
          data: {
            id: selectIds
          }
        })
      "
    >删除</el-button>
    <el-table
      :data="data.tableData"
      stripe
      style="width: 100%; margin: 12px 0 0 0"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="team" label="球队"> </el-table-column>
      <el-table-column prop="duty" label="职务"> </el-table-column>
      <el-table-column prop="start_time" label="开始时间"> </el-table-column>
      <el-table-column prop="end_time" label="结束时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="
              multipleSelectionHandler({
                operation: '删除',
                reqFn: deleteCoachExperience,
                data: {
                  id: String(scope.row.id).split(' ')
                },
                single: true
              })
            "
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增/编辑参数 -->
    <el-dialog
      v-if="data.formDialogVisible"
      v-model="data.formDialogVisible"
      :title="data.dialogTitle"
      width="500px"
    >
      <div class="form-container">
        <ExperienceForm
          :id="searchData.id"
          ref="formRef"
          :status="data.dialogStatus"
          :data="data.formData"
          :award-list="props.awardList"
          :team-list="props.teamList"
        ></ExperienceForm>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="data.formDialogVisible = false"
          >取 消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="handleSubmit"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, onMounted, reactive, ref } from 'vue'
import { getCoachExperience, deleteCoachExperience } from '@/api/data-management/coach'
import useBaseHooks from '@/hooks/useBaseHooks'
import ExperienceForm from './ExperienceForm.vue'

const props = defineProps({
  coachId: {
    type: Number,
    default() {
      return null
    }
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
const searchData = reactive({
  id: ''
})
const formDataDefault = reactive({
  duty: '',
  start_time: '',
  end_time: '',
  id: null,
  coach_id: null,
  team_id: null
})

// 过滤奖项名称
const filterAwardName = (name) => {
  let result = null
  if (props.awardList.length !== 0) {
    result = props.awardList.find((item) => item.code === name)
    return result.name
  }
  return ''
}

onMounted(() => {
  searchData.id = props.coachId
})

const {
  data,
  getTableList,
  selectIds,
  handleSelectionChange,
  multipleSelectionHandler,
  handleCreate,
  handleUpdate
} = useBaseHooks({ reqFn: getCoachExperience, searchData, formDataDefault })

// 新增/编辑表单提交
const handleSubmit = () => {
  formRef.value.submit().then(() => {
    data.formDialogVisible = false
    getTableList()
  })
}
</script>

<style lang='scss' scoped>
</style>
