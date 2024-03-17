<template>
  <div class="people">
    <!-- 搜索栏 -->
    <div class="search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="关键字">
          <el-input v-model.trim="searchForm.key" placeholder="请输入关键字" clearable />
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
              @change="handleTimeChange"
              v-model="searchForm.date"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
            />
        </el-form-item>
        <el-form-item label="语言">
            <el-tag v-for="item in language" :key="item" type="primary" @click="selectLanguage(item)">{{ item }}</el-tag>
        </el-form-item>
        <el-form-item label="分类">
            <el-tag v-for="item in category" :key="item" type="primary" @click="selectCategory(item)">{{ item }}</el-tag>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" color="#2a2e49">搜索</el-button>
          <el-button type="primary" @click="handleReset" color="#2a2e49">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table v-loading="loading" element-loading-text="拼命加载中" :data="newsList" stripe style="width: 100%">
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column prop="title" label="标题" width="250" />
        <el-table-column prop="abstractInfo" label="概述" width="250" />
        <el-table-column prop="languageId" label="语言" :formatter="roleFormatter" width="250" />
        <el-table-column prop="pubTime" label="发布时间" width="250" />
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination v-model:current-page="page" v-model:page-size="size" :page-sizes="[15, 20, 25, 30]"
        layout="total, sizes, prev, pager, next, jumper" :total="Number(total)" @size-change="handleSizeChange"
        @current-change="handleSearch" popper-class="select" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, onMounted } from "vue"
import { usePeopleStore } from "@/store";
import { storeToRefs } from "pinia";
// import type { FormInstance,} from 'element-plus'

const peopleStore = usePeopleStore()

type FromEl = {
  key: string
  category: string
  languageName: string
  endDate: any,
  sinceDate: any,
  date: any
}
// 搜索栏相关
const searchForm = ref<FromEl>({
  key: "",
  category: "",
  languageName: "",
  endDate: "",
  sinceDate: "",
  date: ""
})
// 重置按钮
const handleReset = () => {
  searchForm.value = {
    key: "",
    endDate: "",
    sinceDate: "",
    category: "",
    languageName: "",
    date: []
  }
  page.value = 1
  handleSearch()
}
const handleTimeChange = (options) => {
  searchForm.value.sinceDate = new Date(options[0]).getTime()
  searchForm.value.endDate = new Date(options[1]).getTime()
  console.log(searchForm.value)
}
// 搜索按钮
const handleSearch = () => {
  loading.value = true
  peopleStore.getfilterListACtion(searchForm.value.key)
  peopleStore.getNewListAction(size.value, page.value, searchForm.value.key, searchForm.value.endDate, searchForm.value.sinceDate, searchForm.value.category, searchForm.value.languageName)
    .finally(() => {
      loading.value = false
    })
}

// 表格相关
const loading = ref(true)
const { newsList, total, category, language } = storeToRefs(peopleStore)
const roleFormatter = (row: any) => {
  if (row.languageId === 1880) return "菲律宾语言"
  else if (row.languageId=== 1866) return "英语"
}
// 分页器相关
const page = ref(1)
const size = ref(15)
const handleSizeChange = () => {
  page.value = 1
  handleSearch()
}

onMounted(() => {
  handleSearch()
})
// 选择标签
const selectLanguage = (item:string) => {
  searchForm.value.languageName = item
  handleSearch()
  console.log(item)
}
const selectCategory = (item:string) => {
  searchForm.value.category = item
  handleSearch()

}
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