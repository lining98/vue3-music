<script setup lang="ts">
import IconPark from "@/components/common/iconPark.vue";
import { usePlayerStore } from "@/store/player";
import { Play, GoStart, PauseOne, GoEnd } from "@icon-park/vue-next";
import { ref, toRefs } from "vue";

const { isPause, togglePlay } = toRefs(usePlayerStore());

// let isPause1 = ref(false);
// var audio = new Audio(
//   "http://m8.music.126.net/20230413222656/694766c72c95f1a92beae36e8ec5fed7/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"
// );
// function play1() {
//   isPause1.value = !isPause1.value;
//   isPause1.value ? audio.play() : audio.pause();
// }
</script>

<template>
  <!-- <IconPark :icon="isPause1 ? PauseOne : Play" @click="play1" /> -->
  <div class="player-controller">
    <!-- 上一首 -->
    <IconPark :icon="GoStart" />
    <!-- 播放键 -->
    <IconPark
      :icon="isPause ? PauseOne : Play"
      size="45"
      theme="filled"
      fill='#39c6ad'
      class="player-btn"
      @click="togglePlay"
    />
    <!-- 下一首 -->
    <IconPark :icon="GoEnd" />
  </div>
</template>

<style lang="scss" scoped>
.player-controller{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
