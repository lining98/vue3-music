<template>
  <div class="player-volume">
    <div class="text">{{ volume }}</div>
    <el-slider
      vertical
      v-model="volume"
      :show-tooltip="false"
      :min="0"
      :max="100"
      height="100px"
      size="small"
      :disabled="muted"
      class="volume-slider"
    ></el-slider>
    <IconPark
      class="vicon"
      :icon="muted ? VolumeMute : VolumeSmall"
      theme="filled"
      size="16"
      @click="toggleMuted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import IconPark from "@/components/common/iconPark.vue";
import { VolumeMute, VolumeSmall } from "@icon-park/vue-next";
import { usePlayerStore } from "@/store/player";

const {volume,muted,toggleMuted,setVolume}  = toRefs(usePlayerStore())

</script>

<style lang="scss" scoped>
.player-volume {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    font-size: 14px;
  }
  .volume-slider {
    margin: 5px 0;
  }
  .vicon {
    cursor: pointer;
  }
}
</style>
