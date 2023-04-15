<script setup lang="ts">
import defaultImg from "@/assets/img/OpticalDisk.png";
import { usePlayerStore } from "@/store/player";
import { toRefs } from "vue";

const { song, songUrl, author } = toRefs(usePlayerStore());
</script>

<template>
  <div class="player-song">
    <img alt="" :src="song.al?.picUrl || defaultImg" />
    <div>
      <span class="title">{{ song.name || "云音乐" }}</span>
      <span class="author">{{ author || "作者" }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player-song {
  margin-left: 20px;
  display: flex;
    font-size: 14px;
  div {
    display: flex;
    flex-direction: column;
  }
  img {
    width: 44px;
    margin-right: 10px;
  }
  .author{
    color: #8d939d;
  }
}
</style>
