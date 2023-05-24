<template>
  <h2>最近播放</h2>
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
  { label: "歌曲", name: "recentSongs" },
  { label: "专辑", name: "recentAlbums" },
  { label: "歌单", name: "recentPlaylists" },
  { label: "视频", name: "recentVideos" },
];
</script>