/*
 * @Author: 唐云
 * @Date: 2021-07-27 13:31:03
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-26 17:31:49
 球员管理
 */

<template>
  <div class="home-view">
    <!-- 搜索 -->
    <div class="search-container">
      <el-form ref="form" :model="searchData" label-width="100px" size="small">
        <el-form-item label="姓名">
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
        <el-form-item label="球队" prop="team_id">
          <el-select
            v-model="searchData.team_id"
            placeholder="请选择"
            clearable
            filterable
            @change="getTableList"
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
        <el-form-item label="国家" prop="nation_id">
          <el-select
            v-model="searchData.nation_id"
            placeholder="请选择"
            clearable
            filterable
            @change="getTableList"
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
        <el-form-item label="位置" prop="position">
          <el-select
            v-model="searchData.position"
            placeholder="请选择"
            clearable
            filterable
            @change="getTableList"
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
              reqFn: delPlayer,
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
          <el-table-column prop="name" label="姓名" width="150">
          </el-table-column>
          <el-table-column prop="english_name" label="英文名" width="150">
          </el-table-column>
          <el-table-column prop="team" label="所属球队"> </el-table-column>
          <el-table-column prop="nation" label="国籍"> </el-table-column>
          <el-table-column prop="uniform_number" label="球衣号码">
          </el-table-column>
          <el-table-column prop="high" label="身高">
            <template #default="scope">
              {{ scope.row.high }}<span v-if="scope.row.high">cm</span>
            </template>
          </el-table-column>
          <el-table-column prop="weight" label="体重">
            <template #default="scope">
              {{ scope.row.weight }}<span v-if="scope.row.high">kg</span>
            </template>
          </el-table-column>
          <el-table-column prop="birthday" label="生日" width="100">
          </el-table-column>
          <el-table-column prop="position" label="位置">
            <template #default="scope">
              {{ filterDict(scope.row.position, ballParkPlace) }}
            </template>
          </el-table-column>
          <el-table-column prop="feet" label="惯用脚">
            <template #default="scope">
              {{ filterDict(scope.row.feet, habitFeet) }}
            </template>
          </el-table-column>
          <el-table-column prop="inverse_enough" label="逆足能力" width="120">
            <template #default="scope">
              <el-rate
                :model-value="Number(scope.row.inverse_enough)"
                disabled
                :colors="colors"
              ></el-rate>
            </template>
          </el-table-column>
          <el-table-column prop="fancy_tricks" label="花式技巧" width="120">
            <template #default="scope">
              <el-rate
                :model-value="Number(scope.row.fancy_tricks)"
                disabled
                :colors="colors"
              ></el-rate>
            </template>
          </el-table-column>
          <el-table-column
            prop="international_reputation"
            label="国际声望"
            width="120"
          >
            <template #default="scope">
              <el-rate
                :model-value="Number(scope.row.international_reputation)"
                disabled
                :colors="colors"
              ></el-rate>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="身价">
            <template #default="scope"> {{ scope.row.price }}万欧 </template>
          </el-table-column>
          <el-table-column prop="contract_expire" label="合同到期" width="100">
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
                    reqFn: delPlayer,
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
                @click="handleAbility(scope.row)"
              >能力值</el-button>
              <el-button
                type="text"
                size="small"
                @click="handlePosition(scope.row)"
              >位置</el-button>
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
              <el-button
                type="text"
                size="small"
                @click="handleTransfer(scope.row)"
              >转会记录</el-button>
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
          :nation="nationList"
          :team="teamList"
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
    <!-- 编辑球员能力值 -->
    <el-dialog
      v-if="abilityDialogVisible"
      v-model="abilityDialogVisible"
      title="能力值"
      width="900px"
    >
      <div class="form-container">
        <ability-form :id="playerId" ref="abilityRef"></ability-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="abilityDialogVisible = false"
          >取 消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="abilitySubmit"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 编辑球员位置 -->
    <el-dialog
      v-if="positionDialogVisible"
      v-model="positionDialogVisible"
      title="位置"
      width="800px"
    >
      <div class="form-container">
        <PositionForm :id="playerId" ref="positionRef"></PositionForm>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="positionDialogVisible = false"
          >取 消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="positionSubmit"
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
      <HistoryDataForm :player-id="playerId" />
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
        :player-id="playerId"
        :award-list="awardList"
        :team-list="teamList"
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
    <!-- 转会记录 -->
    <el-dialog
      v-if="playerTransferDialogVisible"
      v-model="playerTransferDialogVisible"
      title="荣誉记录"
      width="1200px"
    >
      <TransferTable
        :player-id="playerId"
        :team-list="teamList"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="playerTransferDialogVisible = false"
          >关 闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getPlayer, delPlayer } from '@/api/data-management/player'
import { getAward, getNation, getTeam } from '@/api/public'
import useBaseHooks from '@/hooks/useBaseHooks'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import Form from './components/Form.vue'
import PositionForm from './components/PositionForm.vue'
import AbilityForm from './components/AbilitiesForm.vue'
import HistoryDataForm from './history-data/HistoryDataTable.vue'
import HonorTable from './honor-data/HonorTable.vue'
import TransferTable from './transfer-data/TransferTable.vue'

const store = useStore()

// 搜索数据
const searchData = reactive({
  title: '',
  spu_id: ''
})
// 默认表单数据
const formDataDefault = reactive({
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
// 评分组件颜色
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
// 球员id
const playerId = ref('')

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
} = useBaseHooks({ reqFn: getPlayer, searchData, formDataDefault })

/**
 * 初始化请求
 */
onMounted(() => {
  getTeamList()
  getNationList()
  getAwardList()
})
// 球队列表
const teamList = ref([])
const getTeamList = async () => {
  const res = await getTeam()
  teamList.value = res.data.records
}
// 国家列表
const nationList = ref([])
const getNationList = async () => {
  const res = await getNation()
  nationList.value = res.data.records
}
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
 * 球员能力值弹窗
 */
const abilityDialogVisible = ref(false)
const abilityRef = ref(null)
const handleAbility = (row) => {
  abilityDialogVisible.value = true
  playerId.value = row.id
}
// 能力值表单提交
const abilitySubmit = () => {
  abilityRef.value.submit().then(() => {
    abilityDialogVisible.value = false
  })
}

/**
 * 球员位置弹窗
 */
const positionDialogVisible = ref(false)
const positionRef = ref(null)
const handlePosition = (row) => {
  positionDialogVisible.value = true
  playerId.value = row.id
}
// 位置表单提交
const positionSubmit = () => {
  positionRef.value.submit().then(() => {
    positionDialogVisible.value = false
  })
}

/**
 * 历史数据弹窗
 */
const playerDataDialogVisible = ref(false)
const handlePlayerData = (row) => {
  playerDataDialogVisible.value = true
  playerId.value = row.id
}

/**
 * 荣誉记录弹窗
 */
const playerHonorDialogVisible = ref(false)
const handleHonor = (row) => {
  playerHonorDialogVisible.value = true
  playerId.value = row.id
}

/**
 * 转会记录弹窗
 */
const playerTransferDialogVisible = ref(false)
const handleTransfer = (row) => {
  playerTransferDialogVisible.value = true
  playerId.value = row.id
}

</script>

<style lang="scss">
.el-rate__item .el-rate__icon {
  margin-right: 0px;
}
</style>
