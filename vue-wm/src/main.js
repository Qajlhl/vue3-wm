import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import router from './router'
import  '@/assets/base.css'
import store from '@/vuex/index'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import './api/mock'
const app = createApp(App)
app.use(router).use(store)
app.mount('#app')
