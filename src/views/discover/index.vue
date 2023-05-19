<template>
  <ul class="nav">
    <li v-for="item in navList" :key="item.name">
      <router-link :to="{ name: item.name }"  exact :exact-active-class="'actived'">{{ item.label }}</router-link>
    </li>
  </ul>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeName = ref("personality");

const navList = [
  { label: "个性推荐", name: "recommend" },
  { label: "排行榜", name: "ranking" },
  { label: "歌单", name: "rplaylist" },
  { label: "歌手", name: "artist" },
];
</script>
