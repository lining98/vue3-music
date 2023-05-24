<template>
  <div class="module-menu" v-for="(item, i) in menus" :key="i">
    <div class="menus-title">{{ item.name }}</div>
    <div
      class="menus-item"
      :class="route.path.indexOf(menu.key) >= 0 ? 'active' : ''"
      v-for="menu in item.menus"
      :key="menu.key"
      @click="router.push({ name: menu.name })"
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
const route = useRoute();
const router = useRouter();

const { menus } = useMenu();
</script>
