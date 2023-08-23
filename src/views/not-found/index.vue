<template>
  <div class="not-found">
    <div class="info">
      <img src="@/assets/image/logo.png" alt="">
      <div class="text">
        404......
        <div class="tip">点击<span class="backBtn" @click="bindBack">此处</span>回到首页</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 返回首页
const bindBack = () => {
  router.push({
    path: '/home'
  })
}
</script>

<style lang='scss' scoped>
.not-found {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .info {
    display: flex;
    align-items: center;
    height: 200px;
    width: 400px;
    img {
      height: 200px;
      border-radius: 100px;
      transition: all .8s ease;
    }
    img:hover {
      box-shadow: 10px 10px 10px var(--active-color);
    }
    .text {
      margin-left: 20px;
      text-align: center;
      font-size: 50px;
      font-weight: 600;
      color: var(--primary-color);
      .tip {
        font-size: 16px;
        .backBtn {
        cursor: pointer;
        color: var(--active-color);
        }
      }
    }
  }
}
</style>