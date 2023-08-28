<template>
  <div class="common-header">
    <!-- 导航栏 -->
    <div class="navbar">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <template v-for="item in breadcrumbData" :key="item.name">
            <el-breadcrumb-item v-if="isHome(item)" :to="{ path: '/home' }">{{ item }}</el-breadcrumb-item>
            <el-breadcrumb-item v-else> {{ item }} </el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
      <!-- 工具栏 -->
      <div class="tool">
        <div class="btns">
          <el-tooltip class="box-item" effect="dark" :content="isFullScreen ? '缩小' : '全屏'" placement="top-start">
            <div class="btn" @click="bindfullScrren">
              <img src="@/assets/image/fs.png" alt="" v-show="!isFullScreen">
              <img src="@/assets/image/cfs.png" alt="" v-show="isFullScreen">
            </div>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" :content="isFullScreen ? '折叠菜单' : '展开菜单'" placement="top-start">
            <div class="btn" @click="bindExpand">
              <img src="@/assets/image/expand.png" alt="" v-show="!mainStore.isAsideExpand">
              <img src="@/assets/image/fold.png" alt="" v-show="mainStore.isAsideExpand">
            </div>
          </el-tooltip>
        </div>
        <el-dropdown trigger="click">
          <span class="profile">
            <img src="@/assets/image/profile.jpg" alt="">
            <el-icon class="el-icon--right">
              <component is="ArrowDown"></component>
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logOut">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- tag栏 -->
    <div class="tags">
      <el-tag class="tags_item" :class="{ active: index === currentIndex }" v-for="(tag, index) in tagsData" :key="index"
        :closable="!isHome(tag)" @close="bindClose(index)" @click="bindClick(index)"
        :size="index === currentIndex ? 'default' : 'small'">
        {{ tag }}
      </el-tag>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { toggleFullScreen, debounce } from '@/utils/tool'
import { useMainStore } from '@/store'
import { storeToRefs } from 'pinia'

// 获取状态
const mainStore = useMainStore()
const { isAsideExpand, tagsData } = storeToRefs(mainStore)

// 全屏按钮
const isFullScreen = ref(false)
const bindfullScrren = () => {
  isFullScreen.value = toggleFullScreen(document.body)
}

// 展开按钮
const bindExpand = debounce(() => {
  isAsideExpand.value = !isAsideExpand.value
}, 300)


// 面包屑
const route = useRoute()
const breadcrumbData = ref(new Set<string>())
// 监听路由变化更新面包屑
watch(route, (newValue) => {
  breadcrumbData.value.clear()
  breadcrumbData.value.add("首页")
  for (let item of newValue.matched) {
    let val = item.name?.toString()
    if (val != "首页" && val != undefined) {
      breadcrumbData.value.add(val)
    }
  }
}, {
  immediate: true
})

// tags栏
const router = useRouter()
const currentIndex = ref(0)
// 监听路由变化,更新tags数组
watch(route, (newValue) => {
  let val = newValue.name?.toString()
  if (val === undefined) return
  if (!tagsData.value.includes(val)) {
    tagsData.value.push(val)
    currentIndex.value = tagsData.value.length - 1
  }
  else currentIndex.value = tagsData.value.indexOf(val)
}, {
  immediate: true
})
// 关闭tag
const bindClose = (index: number) => {
  tagsData.value.splice(index, 1)
  if (currentIndex.value > index) currentIndex.value = currentIndex.value - 1
  else if (currentIndex.value === index) currentIndex.value = tagsData.value.length - 1
  else return
}
// 点击tag
const bindClick = (index: number) => {
  currentIndex.value = index
}

// 个人菜单
const logOut = () => {
  // 退出全屏
  if (document.fullscreenElement) document.body.requestFullscreen()
  window.localStorage.removeItem('token')
  // 跳转到登录页
  router.push({
    path: '/login'
  })
}

// 监听当前下标,自动跳转路由
watch(currentIndex, (newValue) => {
  router.push({
    name: tagsData.value[newValue]
  })
}, {
  immediate: true
})

// 当前页面
const isHome = (val: string) => {
  return val === '首页' ? true : false
}
</script>

<style lang='scss' scoped>
.common-header {
  height: 100%;
  background-color: #fff;

  .navbar {
    display: flex;
    justify-content: space-between;
    height: 56px;

    .breadcrumb {
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 20px;
      --el-color-primary: var(--active-color);
    }

    .tool {
      display: flex;

      .btns {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-right: 20px;
        width: 60px;
        height: 56px;

        .btn {
          cursor: pointer;
          height: 20px;

          img {
            height: 100%;
          }
        }
      }

      .profile {
        cursor: pointer;
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
      background-image: linear-gradient(-180deg, #2A2E49 0%, #454655 40%, #595C7A 100%);
      --el-tag-bg-color: none;
      --el-tag-text-color: var(--active-color);
    }
  }
}

:deep(.el-dropdown-menu__item) {
  --el-dropdown-menuItem-hover-fill: none;
  --el-dropdown-menuItem-hover-color: var(--active-color);
}
</style>