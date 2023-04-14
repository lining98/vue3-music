<script setup lang="ts">
import defaultImg from "@/assets/img/OpticalDisk.png";
import { usePlayerStore } from "@/store/player";
import { toRefs } from "vue";

const { song, songUrl } = toRefs(usePlayerStore());
</script>

<template>
  <div class="player-song">
    <!-- {{ song }} -->
    <img alt="" :src="song?.picUrl || defaultImg" />
    <span class="title">{{ song.name || "云音乐 - 作者" }}</span>
  </div>
</template>

<style lang="scss" scoped>
.player-song{
  img{
    width: 50px;
  }
  .title{
    font-size: 14px;
  }
}
</style>
