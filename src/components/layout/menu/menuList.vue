<template>
  <div class="module-menu" v-for="(item, i) in menus" :key="i">
    <div class="menus-title">{{ item.name }}</div>
    <div
      class="menus-item"
      :class="route.path.indexOf(menu.key) >= 0 ? 'active' : ''"
      v-for="menu in item.menus"
      :key="menu.key"
      @click="toMenuRouter(menu.name)"
    >
      <a>
        <IconPark :icon="menu.icon" size="18" />
        <span>{{ menu.title }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconPark from "@/components/common/IconPark.vue"; //引入公共组件
import { useMenu } from "./useMenu";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const route = useRoute();
const router = useRouter();

const { menus } = useMenu();

const toMenuRouter = (name: string) => {
  if (
    (name === "dynamic" || name === "recommendation") &&
    !localStorage.getItem("cookie")
  ) {
    ElMessage.warning("该页面需要登录才能访问");
  } else if (name === "video") {
    router.push({ name: localStorage.getItem('cookie')? 'videoList':'mvList'});
  } else {
    router.push({ name: name });
  }
};
</script>
