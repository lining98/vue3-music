<template>
  <ul class="nav">
    <li v-for="item in navList" :key="item.name">
      <router-link :to="item.name">{{ item.label }}</router-link>
    </li>
  </ul>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeName = ref("personality");

const navList = [
  { label: "个性推荐", name: "recommendation" },
  { label: "排行榜", name: "ranking" },
  { label: "歌单", name: "rplaylist" },
  { label: "歌手", name: "artist" },
];
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-end;
  border-bottom: 2px solid #e4e7ed;
  li {
    transition: all 0.3s;
    a {
      padding: 0 20px;
    }

    .active {
      color: #34d399;
      font-size: 26px;
      font-weight: bold;
      border-bottom: 2px solid #34d399;
    }
  }
}
</style>
