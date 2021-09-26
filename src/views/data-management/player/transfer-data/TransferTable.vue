/*
 * @Author: 唐云
 * @Date: 2021-07-30 15:11:43
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-26 17:27:40
 转会记录
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
          reqFn: deletePlayerTransfer,
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
      <el-table-column prop="time" label="时间"> </el-table-column>
      <el-table-column prop="old_team" label="转出球队"> </el-table-column>
      <el-table-column prop="new_team" label="转入球队"> </el-table-column>
      <el-table-column prop="price" label="价格">
        <template #default="scope"> {{ scope.row.price }}万欧 </template>
      </el-table-column>
      <el-table-column prop="transfer_type" label="转会类型">
        <template #default="scope">
          {{ filterDict(scope.row.transfer_type, transferType) }}
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
                reqFn: deletePlayerTransfer,
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
        <TransferForm
          :id="searchData.id"
          ref="formRef"
          :status="data.dialogStatus"
          :data="data.formData"
          :team-list="props.teamList"
          :award-list="props.awardList"
        ></TransferForm>
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
import { getPlayerTransfer, deletePlayerTransfer } from '@/api/data-management/player'
import useBaseHooks from '@/hooks/useBaseHooks'
import TransferForm from './TransferForm.vue'
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
  time: '',
  old_team_id: '',
  new_team_id: '',
  price: '',
  transfer_type: '',
  id: null,
  player_id: null
})

// 转会类型
const transferType = computed(() => store.getters.transferType)

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
} = useBaseHooks({ reqFn: getPlayerTransfer, searchData, formDataDefault })

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
