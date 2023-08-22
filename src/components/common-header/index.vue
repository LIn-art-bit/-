<template>
  <div class="common-header">
    <div class="navbar">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>测试1</el-breadcrumb-item>
          <el-breadcrumb-item>测试2</el-breadcrumb-item>
          <el-breadcrumb-item>测试3</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="user">
        <el-dropdown trigger="click">
          <span class="profile">
            <img src="@/assets/image/profile.jpg" alt="">
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
          </el-dropdown-menu>
        </template>
        </el-dropdown>
      </div>
    </div>
    <div class="tags">
      <el-tag
        class="tags_item"
        :class="{ active: index === currentIndex }"
        v-for="(tag, index) in tags"
        :key="index"
        closable
      >
        {{ tag.name }}
    </el-tag>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue'


const tags = ref([
  { name: '测试3'},
  { name: '测试4'},
  { name: '测试5'},
])
const currentIndex = 2

</script>

<style lang='scss' scoped>
  .common-header {
    height: 100%;
    .navbar {
      display: flex;
      justify-content: space-between;
      height: 56px;
      .breadcrumb {
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 20px;
      }
      .user {
        cursor: pointer;
        .profile {
          display: flex;
          align-items: center;
          height: 56px;
          padding-right: 20px;
          img {
            height: 60%;
            border-radius: 50%;
          }
        }
      }
    }
    .tags {
      display: flex;
      justify-content: left;
      align-items: center;
      background-color: #e8e8e8;
      padding-left: 20px;
      height: 34px;
        .tags_item {
          cursor: pointer;
          border: 0;
          margin-right: 7px;
          color: var(--primary-color);
          --el-tag-bg-color: #fff;
          --el-tag-text-color: var(--active-color);
          --el-tag-hover-color: var(--active-color);
        }
        .active {
          color: #fff;
          --el-tag-bg-color: var(--primary-color);
          --el-tag-text-color: var(--active-color);
        }
    }
  }
  :deep(.el-dropdown-menu__item) {
    --el-dropdown-menuItem-hover-fill: none;
    --el-dropdown-menuItem-hover-color: var(--active-color);
  }
</style>