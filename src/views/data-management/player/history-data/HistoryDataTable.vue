/*
 * @Author: 唐云
 * @Date: 2021-07-30 15:11:43
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-26 16:45:44
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
          reqFn: deletePlayerData,
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
      <el-table-column prop="time" label="时间" width="100"> </el-table-column>
      <el-table-column prop="enter_field" label="出场"> </el-table-column>
      <el-table-column prop="starter" label="首发"> </el-table-column>
      <el-table-column prop="game_time" label="场均时间"></el-table-column>
      <el-table-column prop="goal" label="进球"></el-table-column>
      <el-table-column prop="assist" label="助攻"></el-table-column>
      <el-table-column prop="averaging_goal" label="场均进球"></el-table-column>
      <el-table-column prop="every_time" label="每球耗时"></el-table-column>
      <el-table-column prop="be_foul" label="被犯规"></el-table-column>
      <el-table-column prop="shoot" label="射门"></el-table-column>
      <el-table-column prop="target_rate" label="射正率"></el-table-column>
      <el-table-column prop="offside" label="越位"></el-table-column>
      <el-table-column prop="key_pass" label="关键传球"></el-table-column>
      <el-table-column prop="pass_total" label="传球总数"></el-table-column>
      <el-table-column prop="pass_success" label="传球成功率" width="100"></el-table-column>
      <el-table-column prop="averaging_steal" label="场均抢断"></el-table-column>
      <el-table-column prop="averaging_intercept" label="场均拦截"></el-table-column>
      <el-table-column prop="averaging_clearance" label="场均解围"></el-table-column>
      <el-table-column prop="playing_time" label="出场时间"></el-table-column>
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
                reqFn: deletePlayerData,
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
import { getPlayerData, deletePlayerData } from '@/api/data-management/player'
import useBaseHooks from '@/hooks/useBaseHooks'
import HistoryDataForm from './HistoryDataForm.vue'

const props = defineProps({
  playerId: {
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
  enter_field: '',
  starter: '',
  game_time: '',
  goal: '',
  assist: '',
  averaging_goal: '',
  every_time: '',
  be_foul: '',
  shoot: '',
  target_rate: '',
  offside: '',
  key_pass: '',
  pass_total: '',
  pass_success: '',
  averaging_steal: '',
  averaging_intercept: '',
  averaging_clearance: '',
  playing_time: '',
  foul: '',
  yellow_card: '',
  red_card: '',
  id: null,
  player_id: null
})

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
  handleUpdate
} = useBaseHooks({ reqFn: getPlayerData, searchData, formDataDefault })

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
