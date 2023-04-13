import { createApp } from 'vue'
import './assets/base.scss'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'

const pinia = createPinia(); // 实例化pinia

createApp(App).use(router).use(pinia).mount('#app')
