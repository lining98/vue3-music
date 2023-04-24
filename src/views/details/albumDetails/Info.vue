<template>
  <div class="albumInfo">
    <div v-if="album" class="info">
      <img :src="album.blurPicUrl" alt="" />
      <div class="detail">
        <h1>
          <el-tag class="ml-2" type="success">专辑</el-tag>
          <span class="name">{{ album.name }}</span>
        </h1>
        <div class="author"
          >歌手：
          <span v-for="(author, index) in album.artists" :key="author.id">
            <span>{{ author.name }}</span>
            <span v-if="index != album.artists.length - 1">/</span>
          </span>
        </div>
        <div class="time">
          发布时间：{{timestampToDate(album.publishTime)}}
        </div>
        <div>
          <el-button type="success" @click="playAll">
            <IconPark :icon="PlayOne" size="18" />
            <span>播放全部</span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import MoreText from "@/components/common/moreText.vue";
import IconPark from "@/components/common/iconPark.vue";
import { PlayOne } from "@icon-park/vue-next";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/store/player";
import {timestampToDate} from '@/utils/time'

const { playList } = storeToRefs(usePlayerStore());
defineProps<{
  album;
  playAll?: () => void;
}>();
</script>

<style lang="scss" scoped>
.albumInfo {
  min-height: 200px;
  .info {
    display: flex;
    font-size: 14px;
    padding-bottom: 20px;
    & > img {
      width: 176px;
      height: 176px;
      border-radius: 15px;
      margin-right: 20px;
    }
    .detail {
      h1 {
        font-size: 24px;
        color: #334155;
        display: flex;
        align-items: center;
        .name {
          margin-left: 10px;
        }
      }
      .time{
        margin: 20px 0;
      }
    }
  }
}
</style>
