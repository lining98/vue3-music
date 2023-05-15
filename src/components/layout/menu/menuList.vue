<template>
  <div class="module-menu" v-for="(item, i) in menus" :key="i">
    <div class="menus-title">{{ item.name }}</div>
    <div class="menus-item" v-for="menu in item.menus" :key="menu.key">
      <router-link :to="{ name: menu.key }">
        <IconPark :icon="menu.icon" size="18" />
        <span>{{ menu.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconPark from "@/components/common/iconPark.vue"; //引入公共组件
import { useMenu } from "./useMenu";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const { menus } = useMenu();
</script>
