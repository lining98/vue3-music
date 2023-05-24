<template>
  <h2>我的收藏</h2>
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
  { label: "歌手", name: "collectibleSinger" },
  { label: "专辑", name: "collectibleAlbum" },
  { label: "视频", name: "collectibleVideo" },
];
</script>