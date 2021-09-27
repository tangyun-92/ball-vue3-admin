/*
 * @Author: 唐云
 * @Date: 2021-07-30 15:11:43
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-27 09:15:19
 伤病记录
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
          reqFn: deletePlayerInjury,
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
      <el-table-column prop="start_time" label="开始时间"> </el-table-column>
      <el-table-column prop="end_time" label="结束时间"> </el-table-column>
      <el-table-column prop="team" label="球队"> </el-table-column>
      <el-table-column prop="injury_code" label="伤病类型">
        <template #default="scope">
          {{ filterDict(scope.row.injury_code, injuryType) }}
        </template>
      </el-table-column>
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
                reqFn: deletePlayerInjury,
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
        <InjuryForm
          :id="searchData.id"
          ref="formRef"
          :status="data.dialogStatus"
          :data="data.formData"
          :team-list="props.teamList"
          :award-list="props.awardList"
        ></InjuryForm>
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
import { computed, defineProps, onMounted, reactive, ref } from 'vue'
import { getPlayerInjury, deletePlayerInjury } from '@/api/data-management/player'
import useBaseHooks from '@/hooks/useBaseHooks'
import InjuryForm from './InjuryForm.vue'
import { whether } from '@/constants/dictionary'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  playerId: {
    type: Number,
    default() {
      return null
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
  start_time: '',
  end_time: '',
  team_id: '',
  injury_code: '',
  id: null,
  player_id: null
})

// 伤病类型
const injuryType = computed(() => store.getters.injuryType)

onMounted(() => {
  searchData.id = props.playerId
})

const {
  data,
  getTableList,
  selectIds,
  handleSelectionChange,
  multipleSelectionHandler,
  handleCreate,
  handleUpdate,
  filterDict
} = useBaseHooks({ reqFn: getPlayerInjury, searchData, formDataDefault })

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
