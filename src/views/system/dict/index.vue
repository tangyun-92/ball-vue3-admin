/*
 * @Author: 唐云
 * @Date: 2021-07-27 13:31:03
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-24 10:29:52
 字典管理
 */

<template>
  <div class="home-view">
    <div class="table-container">
      <!-- 字典类型 -->
      <div class="container">
        <!-- 表格操作 -->
        <div class="opera-main">
          <el-button
            type="primary"
            size="small"
            plain
            @click="handleCreate('dictType')"
          >新增</el-button>
        </div>
        <!-- 表格 -->
        <div class="table-main">
          <el-table
            :data="tableDataType"
            stripe
            style="width: 100%"
            highlight-current-row
            size="small"
            @row-click="chooseOne"
          >
            <el-table-column label="" width="60">
              <template #default="scope">
                <el-radio
                  v-model="currentRadioIndex"
                  :label="scope.row.id"
                  @change="getCurrentRow(scope.row)"
                >
                  &nbsp;
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="字典类型"> </el-table-column>
            <el-table-column prop="code" label="类型代码"> </el-table-column>
            <el-table-column prop="remark" label="备注"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="handleUpdate(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="handleDel(scope.row, 'dictType')"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 字典属性 -->
      <div class="container">
        <!-- 表格操作 -->
        <div class="opera-main">
          <el-button
            type="primary"
            size="small"
            plain
            :disabled="currentRadioIndex === null"
            @click="handleCreate('dictNature')"
          >新增</el-button>
        </div>
        <!-- 表格 -->
        <div class="table-main">
          <el-table
            :data="tableDataNature"
            stripe
            style="width: 100%"
            highlight-current-row
            size="small"
          >
            <el-table-column prop="name" label="字典属性"> </el-table-column>
            <el-table-column prop="code" label="Key值"> </el-table-column>
            <el-table-column prop="remark" label="备注"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button
                  type="text"
                  size="small"
                  :disabled="scope.row.if_parent === 0"
                  @click="handleUpdate(scope.row)"
                >编辑</el-button>
                <el-button
                  type="text"
                  size="small"
                  :disabled="scope.row.if_parent === 0"
                  @click="handleDel(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 新增/编辑字典 -->
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
          :type="data.dictType"
          :dict-type-code="dictTypeCode"
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
  </div>
</template>

<script>
import { getDict, delDict } from '@/api/system/dict'
import useBaseHooks from '@/hooks/useBaseHooks'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import Form from './components/Form.vue'

export default defineComponent({
  name: 'Dict',
  components: {
    Form
  },
  setup() {
    const store = useStore()
    // 字典类型table数据
    const tableDataType = ref([])
    // 字典属性table数据
    const tableDataNature = ref([])
    // 当前删除的类型 dictType-字典类型 dictNature-字典属性
    const delType = ref('')
    const formRef = ref(null)
    // 选中字典类型的code
    const dictTypeCode = ref('')
    // 当前选中的radio的index
    const currentRadioIndex = ref(null)
    // 搜索数据
    const searchData = reactive({
      username: '',
      status: ''
    })
    // 默认表单数据
    const formDataDefault = reactive({
      name: '',
      code: '',
      remark: '',
      if_parent: '',
      parent_code: '',
      id: null
    })

    onMounted(() => {
      getTableList()
    })

    const {
      data,
      handleCreate,
      handleUpdate,
      selectIds
    } = useBaseHooks({ formDataDefault })

    // 获取列表
    const getTableList = async () => {
      data.loading = true
      // 如果删除的是字典类型，将字典属性同时清空，并取消选中字典类型，同时将标志位delType也清空
      if (delType.value === 'dictType') {
        tableDataNature.value = []
        currentRadioIndex.value = null
        delType.value = ''
      }
      const res = await getDict({
        page: data.currentPage,
        pageSize: data.pageSize,
        ...searchData
      })
      store.commit('baseData/SET_DICT_LIST', res.data.records)
      tableDataType.value = res.data.records
      // 被点击字典类型的 code 存在，遍历字典类型，将 children 赋给字典属性列表
      dictTypeCode.value &&
        tableDataType.value.forEach((item) => {
          if (dictTypeCode.value === item.code) {
            tableDataNature.value = item.children
          }
        })
      data.loading = false
    }

    // 删除
    const handleDel = (row, type) => {
      delType.value = type
      ElMessageBox.confirm('是否确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delDict({
          id: String(row.id).split(' '),
          code: row.code
        })
        ElMessage.success(res.message)
        getTableList()
      })
    }

    // 行点击事件
    const chooseOne = (row) => {
      // 保存字典类型的码表代码
      dictTypeCode.value = row.code
      getCurrentRow(row)
    }
    // 获取点击行的数据
    const getCurrentRow = (row) => {
      tableDataNature.value = row.children
      currentRadioIndex.value = row.id
    }

    // 新增/编辑表单提交
    const handleSubmit = () => {
      formRef.value.submit().then(() => {
        data.formDialogVisible = false
        getTableList()
      })
    }

    return {
      formRef,
      data,
      getTableList,
      handleCreate,
      handleUpdate,
      searchData,
      handleSubmit,
      selectIds,
      delDict,
      dictTypeCode,
      currentRadioIndex,
      tableDataType,
      tableDataNature,
      chooseOne,
      getCurrentRow,
      handleDel
    }
  }
})
</script>

<style lang="scss" scoped>
.table-container {
  display: flex;
  justify-content: space-between;

  .container {
    width: 48%;
  }
}
</style>
