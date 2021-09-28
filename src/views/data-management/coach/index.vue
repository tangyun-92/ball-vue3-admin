/*
 * @Author: 唐云
 * @Date: 2021-07-27 13:31:03
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-28 10:50:33
 教练管理
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
              reqFn: delCoach,
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
          <el-table-column prop="avatar" label="队徽" width="80">
            <template #default="scope">
              <img v-if="scope.row.avatar" style="width:40px; height:40px;" :src="scope.row.avatar" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="name" label="教练名" width="150">
          </el-table-column>
          <el-table-column prop="english_name" label="英文名" width="180">
          </el-table-column>
          <el-table-column prop="team" label="球队"> </el-table-column>
          <el-table-column prop="nation" label="国籍"></el-table-column>
          <el-table-column prop="birthday" label="生日" width="120"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="contract_expire" label="合同到期" width="120"></el-table-column>
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
                    reqFn: delCoach,
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
                @click="handlePlayerExperience(scope.row)"
              >执教经历</el-button>
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
    <!-- 新增/编辑教练 -->
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
    <!-- 执教经历 -->
    <el-dialog
      v-if="coachExperienceDialogVisible"
      v-model="coachExperienceDialogVisible"
      title="执教经历"
      width="1200px"
    >
      <ExperienceTable
        :coach-id="coachId"
        :award-list="awardList"
        :team-list="teamList"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="coachExperienceDialogVisible = false"
          >关 闭</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 荣誉记录 -->
    <el-dialog
      v-if="coachHonorDialogVisible"
      v-model="coachHonorDialogVisible"
      title="荣誉记录"
      width="1200px"
    >
      <HonorTable
        :coach-id="coachId"
        :award-list="awardList"
        :team-list="teamList"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button
            size="small"
            @click="coachHonorDialogVisible = false"
          >关 闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCoachList, delCoach } from '@/api/data-management/coach'
import { getAward, getNation, getTeam } from '@/api/public'
import useBaseHooks from '@/hooks/useBaseHooks'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import Form from './components/Form.vue'
import ExperienceTable from './experience-data/ExperienceTable.vue'
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
  team_id: '',
  nation_id: '',
  birthday: '',
  age: '',
  contract_expire: '',
  avatar: '',
  id: null
})
// 教练id
const coachId = ref('')

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
} = useBaseHooks({ reqFn: getCoachList, searchData, formDataDefault })

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
 * 执教经历弹窗
 */
const coachExperienceDialogVisible = ref(false)
const handlePlayerExperience = (row) => {
  coachExperienceDialogVisible.value = true
  coachId.value = row.id
}

/**
 * 荣誉记录弹窗
 */
const coachHonorDialogVisible = ref(false)
const handleHonor = (row) => {
  coachHonorDialogVisible.value = true
  coachId.value = row.id
}

</script>

<style lang="scss">
.el-rate__item .el-rate__icon {
  margin-right: 0px;
}
</style>
