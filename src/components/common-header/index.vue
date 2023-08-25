<template>
  <div class="common-header">
    <div class="navbar">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <template v-for="item in breadcrumbData" :key = "item.name">
            <el-breadcrumb-item v-if="item==='首页'" :to="{ path: '/home' }">{{ item }}</el-breadcrumb-item>
            <el-breadcrumb-item v-else> {{ item }} </el-breadcrumb-item>
          </template>

        </el-breadcrumb>
      </div>
      <div class="user">
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
    <div class="tags">
      <el-tag
        class="tags_item"
        :class="{ active: index === currentIndex }"
        v-for="(tag, index) in tags"
        :key="index"
        :closable = "tag === '首页' ? false : true"
        @close="bindClose(index)"
        @click="bindClick(index)"
        :size="index === currentIndex ? 'default' : 'small'"
      >
        {{ tag }}
      </el-tag>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'

// 面包屑
const route = useRoute()
const breadcrumbData = ref(new Set<string>())
// 监听路由变化更新面包屑
watch(route, (newValue)=>{
  breadcrumbData.value.clear()
  breadcrumbData.value.add("首页") 
  for(let item of newValue.matched) {
    let val = item.name?.toString()
    if(val != "首页" && val != undefined) { 
      breadcrumbData.value.add(val)
    }
  }
},{
  immediate: true
})

// tags栏
const router = useRouter()
const tags = ref(["首页"]);
const currentIndex = ref(0)
// 监听路由变化,更新tags数组
watch(route, (newValue)=> {
  let val = newValue.name?.toString()
  if(val === undefined) return
  if(!tags.value.includes(val)) {
    tags.value.push(val)
    currentIndex.value = tags.value.length - 1
  } 
  else currentIndex.value = tags.value.indexOf(val)
},{
  immediate: true
})
// 监听当前下标,跳转路由
watch(currentIndex,(newValue)=>{
  router.push({
    name: tags.value[newValue]
  })
}, {
  immediate:true
})
// 关闭tag
const bindClose = (index: number) => {
  tags.value.splice(index, 1)
  if (currentIndex.value > index) currentIndex.value = currentIndex.value - 1
  else if (currentIndex.value === index) currentIndex.value = tags.value.length - 1
  else return
}
// 点击tag
const bindClick = (index: number) => {
  currentIndex.value = index
}

// 个人菜单
const logOut = () => {
  router.push({
    path:'/login'
  })
}

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
        --el-color-primary: var(--active-color);
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