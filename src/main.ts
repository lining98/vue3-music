import { createApp } from 'vue'
import './assets/base.scss'
import './assets/common.scss'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'

import 'element-plus/dist/index.css'

const pinia = createPinia(); // 实例化pinia

createApp(App).use(router).use(pinia).mount('#app')
