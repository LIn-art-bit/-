<template>
  <div class="people">
    <!-- 搜索栏 -->
    <div class="search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="序号">
          <el-input v-model.trim="searchForm.id" placeholder="请输入序号" clearable />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model.trim="searchForm.username" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model.trim="searchForm.name" placeholder="请输入姓名" clearable />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="searchForm.role" placeholder="请选择角色" popper-class="select" clearable>
            <el-option label="主管" value="0" />
            <el-option label="员工" value="1" />
            <el-option label="服务员" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" popper-class="select" clearable>
            <el-option label="异常" value="0" />
            <el-option label="正常" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" color="#2a2e49">搜索</el-button>
          <el-button type="primary" @click="handleReset" color="#2a2e49">重置</el-button>
          <el-button type="primary" @click="handleAdd" color="#2a2e49">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table v-loading="loading" element-loading-text="拼命加载中" :data="peopleList" stripe style="width: 100%">
        <el-table-column fixed prop="id" label="序号" width="200" />
        <el-table-column prop="username" label="用户名" width="250" />
        <el-table-column prop="name" label="姓名" width="250" />
        <el-table-column prop="role" label="角色" :formatter="roleFormatter" width="250" />
        <el-table-column prop="status" label="状态" :formatter="statusFormatter" width="250" />
        <el-table-column prop="createTime" label="创建时间" width="250" />
        <el-table-column fixed="right" label="操作" width="200">
          <template v-slot="scope">
            <el-button type="danger" size="small" @click="handleDelete(scope.row)" color="#d81f06">删除</el-button>
            <el-button type="default" size="small" @click="handleEdit(scope.row)" color="#2a2e49">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[15, 20, 25, 30]"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleSearch" popper-class="select" />
    </div>
    <!-- 弹窗 -->
    <el-dialog v-model="dialogVisible" :title="title" width="400px" :before-close="handleClose" draggable>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="用户名" style="width: 280px;" prop="username" required>
          <el-input v-model="ruleForm.username" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item label="姓名" style="width: 280px;" prop="name" required>
          <el-input v-model="ruleForm.name" placeholder="请输入姓名" clearable />
        </el-form-item>
        <el-form-item label="角色" prop="role" required>
          <el-select v-model="ruleForm.role" placeholder="请选择角色" popper-class="select" clearable>
            <el-option label="主管" value="0" />
            <el-option label="员工" value="1" />
            <el-option label="服务员" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status" required>
          <el-select v-model="ruleForm.status" placeholder="请选择状态" popper-class="select" clearable>
            <el-option label="异常" value="0" />
            <el-option label="正常" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button color="#2a2e49" @click="submitForm(ruleFormRef)">
            提交
          </el-button>
          <el-button color="#d81f06" @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, onMounted } from "vue"
import { usePeopleStore } from "@/store";
import { storeToRefs } from "pinia";
import { IRuleForm } from "./type";
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

const peopleStore = usePeopleStore()
const curId = ref("")

// 弹窗相关
const dialogVisible = ref(false)
const title = ref("新增");
const handleClose = () => {
  dialogVisible.value = false
}

// 表单验证相关
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref<IRuleForm>({
  name: "",
  username: "",
  role: "",
  status: ""
})

// 验证规则
const rules = reactive<FormRules<IRuleForm>>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'blur' },
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'blur' },
  ]
})

// 提交按钮
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (title.value === "新增") {
        peopleStore.addPeopleDataAction(ruleForm.value).finally(() => {
          dialogVisible.value = false
          handleSearch()
        })
      }
      else if (title.value === "编辑") {
        peopleStore.editPeopleDataAction({ id: curId.value, ...ruleForm.value }).finally(() => {
          dialogVisible.value = false
          handleSearch()
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 重置按钮
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 搜索栏相关
const searchForm = ref({
  id: "",
  name: "",
  role: "",
  status: "",
  username: ""
})
// 重置按钮
const handleReset = () => {
  searchForm.value = {
    id: "",
    name: "",
    role: "",
    status: "",
    username: ""
  }
  currentPage.value = 1
  handleSearch()
}
// 新增按钮
const handleAdd = () => {
  title.value = "新增"
  dialogVisible.value = true;
  resetForm(ruleFormRef.value)
}
// 搜索按钮
const handleSearch = () => {
  loading.value = true
  peopleStore.getPeopleDataAction(pageSize.value, currentPage.value, searchForm.value.id, searchForm.value.username, searchForm.value.name, searchForm.value.status, searchForm.value.role)
    .finally(() => {
      loading.value = false
    })
}

// 表格相关
const loading = ref(true)
const { peopleList, total } = storeToRefs(peopleStore)
// 删除按钮
const handleDelete = (row: any) => {
  ElMessageBox.confirm(
    `是否删除${row.name}?`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      cancelButtonClass: "cancelButton",
      confirmButtonClass: "confirmButton",
      draggable: true
    }
  )
    .then(() => {
      peopleStore.deletePeopleDataAction(row.id).finally(() => {
        handleSearch()
      })
      ElMessage({
        type: 'success',
        message: '删除成功！',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
// 编辑按钮
const handleEdit = (row: any) => {
  const { id, name, username, role, status } = row
  curId.value = id
  ruleForm.value = {
    name,
    username,
    role: role.toString(),
    status: status.toString(),
  }
  title.value = "编辑"
  dialogVisible.value = true;
}
const statusFormatter = (row: any) => {
  if (row.status === 1) return "正常"
  else return "异常"
}
const roleFormatter = (row: any) => {
  if (row.role === 0) return "主管"
  else if (row.role === 1) return "员工"
  else if (row.role === 2) return "服务员"
}

// 分页器相关
const currentPage = ref(1)
const pageSize = ref(15)
const handleSizeChange = () => {
  currentPage.value = 1
  handleSearch()
}


onMounted(() => {
  handleSearch()
})
</script>

<style lang='scss' scoped>
.people {
  height: 100%;

  .search {
    padding: 20px 0;
    background-color: #fff;
    border-radius: 4px;
  }

  .table {
    margin-top: 10px;
    width: 100%;
    height: 670px;
    overflow: auto;
  }

  .pagination {
    margin-top: 20px;
  }

}

:deep(.el-pager li.is-active) {
  color: var(--active-color);
}

:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--active-color) inset !important;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--active-color) inset !important;
}

:deep(.el-pager li:hover) {
  color: var(--active-color) !important;
}

:deep(.el-pagination button:hover) {
  color: var(--active-color) !important;
}

:deep(.el-form-item) {
  margin: 20px;
}

:deep(.el-loading-spinner .path) {
  stroke: var(--active-color);
}

:deep(.el-loading-spinner .el-loading-text) {
  color: var(--primary-color);
}

:deep(.el-dialog__headerbtn:hover i) {
  color: var(--active-color) !important;
}
</style>

<!-- 修改部分样式 -->
<style>
.select {
  .el-select-dropdown__item.selected {
    color: var(--active-color);
  }
}

.cancelButton {
  background-color: var(--active-color);
  border: 0;
  color: #fff;
}

.cancelButton:hover {
  background-color: rgb(228, 98, 81);
  color: #fff;
}

.confirmButton {
  background-color: var(--primary-color) !important;
  border: 0;
}

.confirmButton:hover {
  background-color: rgb(106, 109, 128) !important;
}

.el-message-box__headerbtn:hover i {
  color: var(--active-color) !important;
}
</style>