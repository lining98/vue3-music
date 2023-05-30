<template>
  <div class="player-action">
    <!-- 音量 -->
    <el-popover placement="top" :width="50" trigger="click">
      <template #reference>
        <IconPark class="vicon" :icon="VolumeSmall" size="18" />
      </template>
      <PlayerVolumeSlider class="volume" />
    </el-popover>

    <div class="time">
      {{ useFormatDuring(currentTime * 1000) }}/{{
        useFormatDuring(duration * 1000)
      }}
    </div>
    <div class="music-list-icon" @click="showPlayList = true">
      <IconPark :icon="MusicList" size="20" />
      <span class="count">{{ playListCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormatDuring } from "@/utils/format";
import { usePlayerStore } from "@/store/player";
import IconPark from "@/components/common/IconPark.vue";
import { MusicList, VolumeSmall } from "@icon-park/vue-next";
import { storeToRefs } from "pinia";

import PlayerVolumeSlider from "./playerVolumeSlider.vue";

const { currentTime, duration, playListCount, showPlayList } = storeToRefs(
  usePlayerStore()
);
</script>

<style lang="scss" scoped>
.player-action {
  margin-right: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  .music-list-icon {
    position: relative;
    .i-icon {
      margin: 0 3px 0 10px;
      position: relative;
      top: 3px;
    }
  }
  .music-list-icon:hover {
    cursor: pointer;
    color: #39c6ad;
  }

  // 音量
  .vicon {
    position: relative;
    top: 3px;
    right: 10px;
  }
  :deep(.el-popover.el-popper) {
    min-width: 0 !important;
    .player-volume {
      width: 40px;
    }
  }
}
</style>
