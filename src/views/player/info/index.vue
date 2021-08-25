/*
 * @Author: 唐云
 * @Date: 2021-07-27 13:31:03
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-25 10:22:32
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
          size="small"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
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
          <el-table-column prop="birthday" label="生日" width="90">
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
          <el-table-column prop="contract_expire" label="合同到期" width="90">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
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
      width="800px"
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
      width="800px"
    >
      <div class="form-container">
        <AbilityForm
          :id="playerId"
          ref="abilityRef"
        ></AbilityForm>
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
  </div>
</template>

<script setup>
import { getPlayer, delPlayer } from '@/api/player/info'
import { getNation, getTeam } from '@/api/public'
import useBaseHooks from '@/hooks/useBaseHooks'
import { computed, onMounted, reactive, ref } from 'vue'
import Form from './components/Form.vue'
import AbilityForm from './components/AbilityForm.vue'
import { useStore } from 'vuex'

const store = useStore()
const formRef = ref(null)
// 球队列表
const teamList = ref([])
// 国家列表
const nationList = ref([])
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
// 能力值弹窗状态
const abilityDialogVisible = ref(false)
// 球员id
const playerId = ref('')
const abilityRef = ref(null)

// 位置
const ballParkPlace = computed(() => store.getters.ballParkPlace)
// 惯用脚
const habitFeet = computed(() => store.getters.habitFeet)

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

onMounted(() => {
  getTeamList()
  getNationList()
})

// 获取球队列表
const getTeamList = async () => {
  const res = await getTeam()
  teamList.value = res.data.records
}
// 获取国家列表
const getNationList = async () => {
  const res = await getNation()
  nationList.value = res.data.records
}
// 获取指定球员能力值
const handleAbility = async (row) => {
  abilityDialogVisible.value = true
  // const res = await getPlayerAbility({
  //   id: row.id
  // })
  playerId.value = row.id
}

// 新增/编辑表单提交
const handleSubmit = () => {
  formRef.value.submit().then(() => {
    data.formDialogVisible = false
    getTableList(data.currentPage)
  })
}
// 能力值表单提交
const abilitySubmit = () => {
  abilityRef.value.submit().then(() => {
    abilityDialogVisible.value = false
  })
}

</script>

<style lang="scss">
.el-rate__item .el-rate__icon {
  margin-right: 0px;
}
</style>
