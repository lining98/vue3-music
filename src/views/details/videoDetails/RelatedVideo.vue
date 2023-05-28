<template>
  <div class="relate">
    <h2>相关推荐</h2>
    <ul class="list">
      <li v-for="item in videos" :key="item.vid">
        <div class="img">
          <img :src="item.coverUrl" alt="" />
          <div class="playcount">
            <IconPark class="icon" :icon="VideoOne" size="18" />{{
              useNumberFormat(item.playTime)
            }}
          </div>
          <div class="time">{{ useFormatDuring(item.durationms) }}</div>
        </div>
        <div>
          <p>{{ item.title }}</p>
          <span>{{ item.creator[0]?.userName }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getRelatedAllvideo } from "@/api/video";
import { useRoute } from "vue-router";
import IconPark from "@/components/common/IconPark.vue";
import { VideoOne } from "@icon-park/vue-next";
import { useNumberFormat, useFormatDuring } from "@/utils/format";

const route = useRoute();

const videos = ref([]);

const getData = async () => {
  const { data } = await getRelatedAllvideo(route.query.id);
  videos.value = data;
};

onMounted(getData);
</script>

<style lang="scss" scoped>
.relate {
  .list {
    li {
      width: 100%;
      display: flex;
      margin-bottom: 10px;
      .img {
        width: 50%;
        margin-right: 10px;
        position: relative;
        color: #fff;
        .playcount {
          background-color: rgba($color: #000000, $alpha: 0.1);
          position: absolute;
          right: 0;
          top: 0;
          box-sizing: border-box;
          padding-right: 5px;
          .icon {
            color: #fff;
          }
          span {
            margin-right: 5px;
            position: relative;
            top: 3px;
          }
        }
        .time {
          background-color: rgba($color: #000000, $alpha: 0.1);
          font-size: 12px;
          position: absolute;
          left: 3px;
          bottom: 0;
        }
      }
      > div {
        color: #1f1e1e;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      p {
        width: 170px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      span {
        color: #aaa;
        font-size: 12px;
      }
    }
  }
}
</style>
