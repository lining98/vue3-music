import { createApp } from 'vue';
import './assets/base.scss';
import './assets/common.scss';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import IconPark from './components/common/IconPark.vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const pinia = createPinia(); // 实例化pinia

const app = createApp(App);
app.component('IconPark', IconPark);

app.use(router);
app.use(pinia);
app.use(ElementPlus, {
	locale: zhCn,
});

app.mount('#app');
