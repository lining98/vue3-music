<template>
  <div class="player-action">
    <div class="time">
      {{ useFormatDuring(currentTime * 1000) }}/{{
        useFormatDuring(duration * 1000)
      }}
    </div>
    <div class="icon">
      <IconPark :icon="MusicList" size="20" @click="showPlayList = true" />
      <span class="count">{{ playListCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormatDuring } from "@/utils/numbers";
import { usePlayerStore } from "@/store/player";
import IconPark from "@/components/common/iconPark.vue";
import { MusicList } from "@icon-park/vue-next";
import { storeToRefs } from "pinia";

const { currentTime, duration, playListCount,showPlayList } = storeToRefs(usePlayerStore());
</script>

<style lang="scss" scoped>
.player-action {
  margin-right: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  .icon {
    .i-icon{
        margin: 0 3px 0 10px;
        position: relative;
        top: 3px;
    }
  }
  .icon:hover {
    cursor: pointer;
    color: #39c6ad;
  }
}
</style>
