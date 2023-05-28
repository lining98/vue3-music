<template>
  <!-- 视频/MV 详细 -->
  <div class="details">
    <h2>{{ type === "video" ? "视频" : "MV" }}详细</h2>
    <!-- 视频 -->
    <div class="video" v-if="type === 'video'">
      <video :src="videoUrl" controls :poster="detail?.coverUrl"></video>
      <div class="creator">
        <img :src="detail?.avatarUrl" alt="" />
        <span class="clickable">{{ detail.creator?.nickname }}</span>
      </div>
      <h2>{{ detail.title }}</h2>
      <div class="time">
        <p>发布：{{formatDate(detail.publishTime)}}</p>
        <p>播放：{{useNumberFormat(detail.playTime)}}</p>
      </div>
    </div>
    <!-- mv -->
    <div class="mv" v-if="type === 'mv'">
      <video :src="videoUrl" controls :poster="detail?.cover"></video>
      <div class="creator" v-for="item in detail.artists" :key="item.id">
        <img :src="item.img1v1Url" alt="" />
        <span class="clickable">{{ item.name }}</span>
      </div>
      <h2>{{ detail.name }}</h2>
      <div class="time">
        <p>发布：{{detail.publishTime}}</p>
        <p>播放：{{useNumberFormat(detail.playCount)}}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { formatDate,useNumberFormat } from '@/utils/format'
const route = useRoute();
const type = route.query.type;

defineProps(["videoUrl", "detail"]);
</script>

<style lang="scss" scoped>
.details {
  margin-bottom: 80px;
  video{
    height: 377px;
  }
  .creator {
    display: flex;
    align-items: center;
    margin: 10px 0 15px;
    img {
      border-radius: 50%;
      width: 50px;
      height: 50px;
      margin-right: 15px;
    }
  }
}
</style>
