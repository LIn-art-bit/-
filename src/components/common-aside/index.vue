<template>
  <div class="common-aside">
    <el-menu
      default-active="2"
      :collapse="flag"
      >
      <div class="logo" @click="flag=!flag">
        <img src="@/assets/image/logo.png" alt="">
        <!-- <span v-show="!flag">Radmin</span> -->
      </div>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang='ts' setup>
import { ref} from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const flag = ref(false)

</script>

<style lang='scss' scoped>

  .common-aside {
    height: 100%;
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 56px;
      img {
        cursor: pointer;
        border-radius: 20px;
        height: 70%;
        transition: all .8s ease;
      }
      img:hover {
        box-shadow: 3px 3px 3px var(--active-color);
      }
      span {
        position: relative;
        left: 3px;
        color: #fff;
        white-space: nowrap;
      }
    }
  }
  :deep(.el-menu) {
    background-image: linear-gradient(-180deg, #2A2E49 0%, #454655 40%, #595C7A 100%);
    border-right: 0;
    height: 100%;
  }
  :deep(.el-menu-item) {
    color: #fff;
  }
  :deep(.el-menu-item:hover) {
    background-color: rgba(255,255,255,.1);
    color: var(--active-color);
  }
  :deep(.el-menu-item.is-active) {
    color: var(--active-color);
    border-right: 5px solid var(--active-color);
  }
  :deep(.el-sub-menu__title) {
    color: #fff;
  }
  :deep(.el-sub-menu__title:hover) {
    background-color: rgba(255,255,255,.1);
    color: var(--active-color);
  }
</style>