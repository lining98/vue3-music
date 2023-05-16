<template>
  <div class="cat">
    <Catlist />
    <HotPlaylist />
  </div>
  <div class="playlists">
    <PlayList />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Catlist from "./catlist.vue";
import HotPlaylist from "./hotPlaylist.vue";
import PlayList from "./playList.vue";

const msg = ref("歌单");
</script>

<style lang="scss" scoped>
.cat{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
