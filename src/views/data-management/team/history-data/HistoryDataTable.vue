/*
 * @Author: 唐云
 * @Date: 2021-07-30 15:11:43
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-28 09:33:51
 历史数据
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
          reqFn: deleteTeamData,
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
      <el-table-column prop="time" label="时间" width="140"> </el-table-column>
      <el-table-column prop="ranking" label="联赛排名"> </el-table-column>
      <el-table-column prop="integral" label="积分"> </el-table-column>
      <el-table-column prop="win" label="胜"></el-table-column>
      <el-table-column prop="deuce" label="平局"></el-table-column>
      <el-table-column prop="lose" label="负"></el-table-column>
      <el-table-column prop="goal" label="进球"></el-table-column>
      <el-table-column prop="fumble" label="失球"></el-table-column>
      <el-table-column prop="penalty_kick" label="点球"></el-table-column>
      <el-table-column prop="averaging_shot" label="场均射门"></el-table-column>
      <el-table-column prop="averaging_respectively" label="场均射正"></el-table-column>
      <el-table-column prop="averaging_pass" label="场均传球"></el-table-column>
      <el-table-column prop="pass_success" label="传球成功率" width="120"></el-table-column>
      <el-table-column prop="key_pass" label="关键传球"></el-table-column>
      <el-table-column prop="steal" label="抢断"></el-table-column>
      <el-table-column prop="intercept" label="拦截"></el-table-column>
      <el-table-column prop="clearance" label="解围"></el-table-column>
      <el-table-column prop="foul" label="犯规"></el-table-column>
      <el-table-column prop="yellow_card" label="黄牌"></el-table-column>
      <el-table-column prop="red_card" label="红牌"></el-table-column>
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
                reqFn: deleteTeamData,
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
      width="800px"
    >
      <div class="form-container">
        <HistoryDataForm
          :id="searchData.id"
          ref="formRef"
          :status="data.dialogStatus"
          :data="data.formData"
        ></HistoryDataForm>
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
import { getTeamData, deleteTeamData } from '@/api/data-management/team'
import useBaseHooks from '@/hooks/useBaseHooks'
import HistoryDataForm from './HistoryDataForm.vue'

const props = defineProps({
  teamId: {
    type: Number,
    default() {
      return null
    }
  }
})

const formRef = ref(null)
const searchData = reactive({
  id: ''
})
const formDataDefault = reactive({
  time: '',
  ranking: '',
  integral: '',
  win: '',
  deuce: '',
  lose: '',
  goal: '',
  fumble: '',
  penalty_kick: '',
  averaging_shot: '',
  averaging_respectively: '',
  averaging_pass: '',
  pass_success: '',
  key_pass: '',
  steal: '',
  intercept: '',
  clearance: '',
  foul: '',
  yellow_card: '',
  red_card: '',
  id: null,
  team_id: null
})

onMounted(() => {
  searchData.id = props.teamId
})

const {
  data,
  getTableList,
  selectIds,
  handleSelectionChange,
  multipleSelectionHandler,
  handleCreate,
  handleUpdate
} = useBaseHooks({ reqFn: getTeamData, searchData, formDataDefault })

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
