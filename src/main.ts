import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/css/common.css'
import { createPinia } from 'pinia'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'nprogress/nprogress.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/mock'
import 'element-plus/dist/index.css'
import 'default-passive-events'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
