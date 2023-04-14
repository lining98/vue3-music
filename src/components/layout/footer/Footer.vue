<template>
  <div class="music-player">
    <div class="player-l">
      <PlayerSong />
    </div>
    <div class="player-m">
      <PlayerSlier />
      <!-- <PlayerController /> -->
    </div>
    <div class="player-r">
      11
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayerSong from "./playerSong.vue";
import PlayerController from "./playerController.vue";
import PlayerSlier from "./playerSlier.vue";
</script>

<style lang="scss">
.music-player {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  border-top: 1px solid #000;
  .player-m{
    flex: 1;
  }
}
</style>
