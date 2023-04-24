<template>
  <div class="player-controller">
    <!-- 播放顺序 -->
    <IconPark
      :icon="loopType === 0 ? ShuffleOne : loopType === 1 ? PlayOnce : LoopOnce"
      size="18"
      @click="toggleLoop"
    />
    <!-- 上一首 -->
    <IconPark :icon="GoStart" @click="prev" size="24" />
    <!-- 播放键 -->
    <IconPark
      :icon="isPause ? PauseOne : Play"
      size="45"
      theme="filled"
      fill="#39c6ad"
      class="player-btn"
      @click="togglePlay"
    />
    <!-- 下一首 -->
    <IconPark :icon="GoEnd" @click="next" size="24" />
    <!-- 音量 -->
    <div class="popover">
      <IconPark class="vicon" :icon="VolumeSmall" size="18" />
      <div class="volume">
        <PlayerVolumeSlider />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconPark from "@/components/common/iconPark.vue";
import PlayerVolumeSlider from "./playerVolumeSlider.vue";
import { usePlayerStore } from "@/store/player";
import {
  Play,
  GoStart,
  PauseOne,
  GoEnd,
  PlayOnce,
  LoopOnce,
  ShuffleOne,
  VolumeSmall,
} from "@icon-park/vue-next";
import { ref, toRefs } from "vue";

const { isPause, loopType, togglePlay, toggleLoop, next, prev } = toRefs(
  usePlayerStore()
);
</script>

<style lang="scss" scoped>
.player-controller {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 18px;
  .i-icon:hover {
    cursor: pointer;
    color: #39c6ad;
  }
  // 音量
  .popover {
    position: relative;
    .volume {
      background-color: #fff;
      padding: 5px 0;
      box-sizing: border-box;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba($color: #999, $alpha: 0.8);
      position: absolute;
      left: -8px;
      top: -175px;
      z-index: 999;
      transition: opacity 0.3s;
      opacity: 0;
    }
  }
  .popover:hover {
    .volume {
      opacity: 1;
    }
  }
}
</style>
