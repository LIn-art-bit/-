<template>
  <div class="main" ref="mainRef">
    <el-container class="main-container">
      <el-aside width="auto">
        <common-aside />
      </el-aside>
      <el-container>
        <el-header class="main-header">
          <common-header />
        </el-header>
        <el-main class="main-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang='ts' setup>
import CommonAside from '@/components/common-aside/index.vue'
import CommonHeader from '@/components/common-header/index.vue'

</script>
<style lang='scss' scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  .main-container {
    height: 100%;
    width: 100%;

    .main-header {
      padding: 0;
      height: 90px;
    }

    .main-content {
      padding: 0 20px 20px 20px;
      background-color: #e8e8e8;
    }
  }
}
</style>