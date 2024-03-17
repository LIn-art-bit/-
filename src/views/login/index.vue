<template>
  <div class="login">
    <div class="panel">
      <div class="panel-left">
        <div class="inner">
          <img src="@/assets/image/logo.svg" alt="">
          <div class="text">R-admin</div>
        </div>
      </div>
      <div class="panel-right">
        <div class="title">欢迎使用!</div>
        <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" label-width="auto"
          hideRequiredAsterisk class="inner-login">
          <el-form-item label="用户名:" prop="userName">
            <el-input v-model="loginForm.userName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="loginForm.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" color="#2a2e49" @click="submitForm(loginFormRef)" :loading="isloading">
              登录
            </el-button>
            <el-button type="primary" size="small" color="#2a2e49" @click="resetForm(loginFormRef)" :disabled="isloading">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/store';
import { ElMessage, ElNotification } from 'element-plus'

const router = useRouter()

const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  userName: '',
  password: ''
})
// 验证规则
const rules = reactive<FormRules<typeof loginForm>>({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '用户名长度应为3-5', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码最小长度为8', trigger: 'blur' }
  ]
})
const isloading = ref(false)

// 登录逻辑
const loginStore = useLoginStore()

// 登录按钮
const submitForm = (formEl: FormInstance | undefined) => {  
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      isloading.value = true
      loginStore.accountLoginAction(loginForm).then(res=>{
        if(res) {
          ElMessage({
            message: '登录成功！',
            type: 'success',
          })
          router.push({
            path: '/home'
          })
        } else {
          isloading.value = false
          ElMessage.error('登陆失败！请检查密码是否正确或者用户是否存在！')
        }
      })
    } else {
      isloading.value = false
      return false
    }
  })
}
// 重置按钮
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 提示框
onMounted(() => {
  ElNotification({
    title: '提示',
    message: '账户:admin 密码:12345678',
    duration: 3000,
  })
})

</script>

<style lang='scss' scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // background-image: linear-gradient(-180deg, #2A2E49 0%, #454655 40%, #595C7A 100%);
  background-image: url('@/assets/image/bg.jpg');
  display: flex;
  justify-content: center;
  align-items: center;

  .panel {
    display: flex;
    align-items: center;
    width: 600px;
    height: 400px;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 20px;

    .panel-left {
      display: flex;
      justify-content: center;
      width: 300px;
      height: 50%;

      img {
        display: block;
        width: 100px;
        border-radius: 50px;
        transition: all .8s ease;
      }

      img:hover {
        box-shadow: 8px 8px 8px var(--active-color);
      }

      .text {
        margin-top: 30px;
        color: #fff;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
      }
    }

    .panel-right {
      width: 300px;
      height: 100%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 0 20px 20px 0;

      .title {
        font-size: 24px;
        font-weight: 600;
        color: var(--primary-color);
      }

      .inner-login {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 200px;

        .el-input {
          --el-color-primary: var(--primary-color);
          width: 150px;
        }
      }
    }
  }
}

// 清除chorme浏览器自动填入的样式
:deep(input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active) {
  -webkit-transition-delay: 111111s;
  -webkit-transition: color 11111s ease-out, background-color 111111s ease-out;
}
</style>