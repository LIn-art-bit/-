<template>
  <div class="common-aside">
    <el-menu
      :default-active="route.path"
      :collapse="isShow"
      :router="true"
      >
      <div class="logo" @click="clickSwitch">
        <img src="@/assets/image/logo.png" alt="">
      </div>
      <template v-for="item in routes" :key="item.name">
        <el-menu-item v-if="item.meta.isMenu && item.children.length===0" :index="item.path">
          <el-icon>
            <component :is="item.meta.icon" style="width: 18px;"></component>
          </el-icon>
          <template #title>{{ item.name }}</template>
        </el-menu-item>
        <el-sub-menu v-if="item.meta.isMenu && item.children.length !== 0" :index="item.path">
          <template #title>
            <el-icon>
              <component :is="item.meta.icon" style="width: 18px;"></component>
            </el-icon>
            <span> {{item.name}} </span>
          </template>
          <el-menu-item-group>
            <template v-for="child, in item.children" :key="child.name">
               <el-menu-item :index="`${item.path}/${child.path}`"> {{ child.name }} </el-menu-item>
            </template>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang='ts' setup>
import { debounce } from '@/utils/tool';
import { ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()

// 控制侧边栏的展开状态
const isShow = ref(false)
// 按钮-防抖处理
const clickSwitch = debounce(() => {
  isShow.value = !isShow.value
}, 300)

// 获取所有路由的信息
const router = useRouter()
const routes = router.getRoutes()

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