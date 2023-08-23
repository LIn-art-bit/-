import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/css/common.css'
import { createPinia } from 'pinia'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)  
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
