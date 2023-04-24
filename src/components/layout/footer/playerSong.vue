<template>
  <div class="player-song">
    <img
      alt=""
      :src="song.al?.picUrl || defaultImg"
      @click="showPopup = !showPopup"
    />
    <div>
      <span class="title">{{ song.name || "云音乐" }}</span>
      <span class="author">
        <span v-for="(item, index) in song.ar">
          <span
            class="clickable"
            @click="
              router.push({ name: 'artistDetail', query: { id: item.id } })
            "
            >{{ item.name }}</span
          >
          <span v-if="index != song.ar.length - 1">/</span>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultImg from "@/assets/img/OpticalDisk.png";
import { usePlayerStore } from "@/store/player";
import { storeToRefs } from "pinia";
import { toRefs } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { song, songUrl, author, showPopup } = storeToRefs(usePlayerStore());
</script>

<style lang="scss" scoped>
.player-song {
  position: relative;
  margin-left: 30px;
  display: flex;
  font-size: 14px;
  z-index: 99;
  div {
    display: flex;
    flex-direction: column;
  }
  img {
    cursor: pointer;
    width: 44px;
    height: 44px;
    margin-right: 10px;
  }
  .author {
    color: #8d939d;
    width: 185px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .clickable:hover {
      cursor: pointer;
      color: #39c6ad;
      text-decoration: underline;
    }
  }
}
</style>
