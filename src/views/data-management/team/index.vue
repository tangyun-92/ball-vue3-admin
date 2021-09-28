/*
 * @Author: 唐云
 * @Date: 2021-07-27 13:31:03
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-28 09:41:01
 球员管理
 */

<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="球队名">
          <el-input
            v-model="searchData.name"
            clearable
            placeholder="请输入"
            @keydown.enter="getTableList"
          ></el-input>
        </el-form-item>
        <el-form-item label="英文名">
          <el-input
            v-model="searchData.english_name"
            clearable
            placeholder="请输入"
            @keydown.enter="getTableList"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="success"
        size="small"
        class="search"
        @click="getTableList"
      >查询</el-button>
    </div>
    <div class="table-container">
      <!-- 表格操作 -->
      <div class="opera-main">
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
              reqFn: delTeam,
              data: {
                id: selectIds
              }
            })
          "
        >删除</el-button>
      </div>
      <!-- 表格 -->
      <div class="table-main">
        <el-table
          :data="data.tableData"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="球队名称" width="150">
          </el-table-column>
          <el-table-column prop="english_name" label="英文名" width="180">
          </el-table-column>
          <el-table-column prop="setup_time" label="成立时间"> </el-table-column>
          <el-table-column prop="area" label="所在地区" width="100"></el-table-column>
          <el-table-column prop="city" label="城市" width="100"></el-table-column>
          <el-table-column prop="home_court" label="球队主场" width="200"></el-table-column>
          <el-table-column prop="person_num" label="容纳人数"></el-table-column>
          <el-table-column prop="tel" label="电话" width="180"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="250"></el-table-column>
          <el-table-column prop="address" label="地址" width="280"></el-table-column>
          <el-table-column prop="world_ranking" label="世界排名"></el-table-column>
          <el-table-column prop="total_value" label="总身价" width="100">
            <template #default="scope">
              {{ scope.row.total_value }}<span v-if="scope.row.total_value">万欧</span>
            </template>
          </el-table-column>
          <el-table-column prop="team_logo" label="队徽" width="120">
            <template #default="scope">
              <img v-if="scope.row.team_logo" style="width:40px; height:40px;" :src="scope.row.team_logo" alt="">
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="240">
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
                    reqFn: delTeam,
                    data: {
                      id: String(scope.row.id).split(' ')
                    },
                    single: true
                  })
                "
              >删除</el-button>
              <el-button
                type="text"
                size="small"
                @click="handlePlayerData(scope.row)"
              >历史数据</el-button>
              <el-button
                type="text"
                size="small"
                @click="handleHonor(scope.row)"
              >荣誉记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      :current-page="data.currentPage"
      :page-sizes="[10, 20, 40, 50, 100]"
      :page-size="data.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!-- 新增/编辑球员 -->
    <el-dialog
      v-if="data.formDialogVisible"
      v-model="data.formDialogVisible"
      :title="data.dialogTitle"
      width="1100px"
    >
      <div class="form-container">
        <Form
          ref="formRef"
          :status="data.dialogStatus"
          :data="data.formData"
        ></Form>
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
    <!-- 历史数据 -->
    <el-dialog
      v-if="playerDataDialogVisible"
      v-model="playerDataDialogVisible"
      title="历史数据"
      width="1200px"
    >
      <HistoryDataForm :team-id="teamId" />
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="playerDataDialogVisible = false"
          >关 闭</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 荣誉记录 -->
    <el-dialog
      v-if="playerHonorDialogVisible"
      v-model="playerHonorDialogVisible"
      title="荣誉记录"
      width="1200px"
    >
      <HonorTable
        :team-id="teamId"
        :award-list="awardList"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="playerHonorDialogVisible = false"
          >关 闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getTeamList, delTeam } from '@/api/data-management/team'
import { getAward, getNation, getTeam } from '@/api/public'
import useBaseHooks from '@/hooks/useBaseHooks'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import Form from './components/Form.vue'
import HistoryDataForm from './history-data/HistoryDataTable.vue'
import HonorTable from './honor-data/HonorTable.vue'

const store = useStore()

// 搜索数据
const searchData = reactive({
  name: '',
  english_name: ''
})
// 默认表单数据
const formDataDefault = reactive({
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
// 球员id
const teamId = ref('')

/**
 * vuex
 */
// 位置
const ballParkPlace = computed(() => store.getters.ballParkPlace)
// 惯用脚
const habitFeet = computed(() => store.getters.habitFeet)

/**
 * 自定义 hooks 数据
 */
const {
  data,
  handleSizeChange,
  handleCurrentChange,
  getTableList,
  handleCreate,
  handleUpdate,
  handleSelectionChange,
  multipleSelectionHandler,
  selectIds,
  filterDict
} = useBaseHooks({ reqFn: getTeamList, searchData, formDataDefault })

/**
 * 初始化请求
 */
onMounted(() => {
  getAwardList()
})
// 奖项列表
const awardList = ref([])
const getAwardList = async () => {
  const res = await getAward()
  awardList.value = res.data.records
}

/**
 * 新增/编辑表单提交
 */
const formRef = ref(null)
const handleSubmit = () => {
  formRef.value.submit().then(() => {
    data.formDialogVisible = false
    getTableList(data.currentPage)
  })
}

/**
 * 历史数据弹窗
 */
const playerDataDialogVisible = ref(false)
const handlePlayerData = (row) => {
  playerDataDialogVisible.value = true
  teamId.value = row.id
}

/**
 * 荣誉记录弹窗
 */
const playerHonorDialogVisible = ref(false)
const handleHonor = (row) => {
  playerHonorDialogVisible.value = true
  teamId.value = row.id
}

</script>

<style lang="scss">
.el-rate__item .el-rate__icon {
  margin-right: 0px;
}
</style>
