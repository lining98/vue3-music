<template>
  <div class="player-song">
    <img alt="" :src="song.al?.picUrl || defaultImg" />
    <div>
      <span class="title">{{ song.name || "云音乐" }}</span>
      <span class="author">
        <span  v-for="(item, index) in song.ar">
          <span class="clickable">{{ item.name }}</span>
          <span v-if="index != song.ar.length - 1">/</span>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultImg from "@/assets/img/OpticalDisk.png";
import { usePlayerStore } from "@/store/player";
import { toRefs } from "vue";

const { song, songUrl, author } = toRefs(usePlayerStore());
</script>

<style lang="scss" scoped>
.player-song {
  position: relative;
  margin-left: 20px;
  display: flex;
  font-size: 14px;
  z-index: 99;
  div {
    display: flex;
    flex-direction: column;
  }
  img {
    width: 44px;
    margin-right: 10px;
  }
  .author {
    color: #8d939d;

    .clickable:hover {
      cursor: pointer;
      color: #39c6ad;
      text-decoration: underline;
    }
  }
}
</style>
