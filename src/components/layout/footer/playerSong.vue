<template>
  <div class="player-song">
    <div class="img" @click="showPopup = !showPopup">
      <img alt="" :src="song.al?.picUrl || defaultImg" />
      <div class="popup">
        <IconPark v-if="showPopup" :icon="DoubleDown" size="24" />
        <IconPark v-else :icon="DoubleUp" size="24" />
      </div>
    </div>
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
import IconPark from "@/components/common/iconPark.vue";
import { DoubleUp,DoubleDown } from "@icon-park/vue-next";
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
  .img {
    cursor: pointer;
    margin-right: 10px;
    position: relative;
    img {
      width: 44px;
      height: 44px;
    }
    .popup {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.2);
      transition: all 0.2s;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      opacity: 0;
    }
    &:hover .popup {
      opacity: 1;
    }
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
