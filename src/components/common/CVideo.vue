<template>
  <ul class="mv">
    <li v-for="item in mvlist" :key="item.id">
      <div class="artVideos" v-if="item.imgurl16v9">
        <div class="art">
          <el-image class="img" :src="item.imgurl16v9" alt="" />
        </div>
        <p>{{ item.name }}</p>
        <div class="model">
          <IconPark class="icon" :icon="Play" size="50" />
        </div>
      </div>
      <div
        class="searchVideos"
        v-if="item.coverUrl"
        @click="toVideoDetails(item)"
      >
        <div class="search">
          <el-image class="img" :src="item.coverUrl" alt="" />
          <div class="playcount">
            <IconPark class="icon" :icon="VideoOne" size="18" />{{
              useNumberFormat(item.playTime)
            }}
          </div>
          <div class="time">{{ useFormatDuring(item.durationms) }}</div>
        </div>
        <p class="title">
          <span v-if="item.type == 0">MV</span>{{ item.title }}
        </p>
        <p class="creator">
          <span v-if="item.type !== 0" class="by">by</span>
          <span v-for="(author, index) in item.creator" :key="author.id">
            <span class="clickable" @click="toSingerDetails(author.id)">
              {{ author.userName }}
            </span>
            <!-- 最后一个歌手后面不加分隔符 -->
            <span class="divider" v-if="index != item.creator.length - 1"
              >/</span
            >
          </span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import IconPark from "@/components/common/IconPark.vue";
import { Play, VideoOne } from "@icon-park/vue-next";
import { getArtistMv } from "@/api/api";
import { useFormatDuring, useNumberFormat } from "@/utils/format";
import { useRouter } from "vue-router";

const router = useRouter();

const {mvlist} = defineProps(["mvlist"]);

const toVideoDetails = (item: any) => {
  router.push({
    name: "videoDetails",
    query: { id: item.vid, type: item.type ? "video" : "mv" },
  });
};
</script>

<style lang="scss" scoped>
.mv {
  display: grid;
  grid-template-columns: repeat(5,1fr);
  // display: flex;
  // flex-wrap: wrap;
  li {
    width: 260px;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s;
    .artVideos,
    .searchVideos {
      position: relative;
      > div {
        width: 260px;
        height: 150px;
        overflow: hidden;
      }
      .model {
        display: none;
        position: absolute;
        top: 0;
        width: 260px;
        height: 150px;
        background-color: rgba($color: #000000, $alpha: 0.6);
        .icon {
          color: #ccc;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .artVideos {
      .img {
        width: 100%;
        height: 150px;
      }
    }
    .artVideos:hover .model {
      display: block;
    }
    .searchVideos {
      .img {
        top: 50%;
        transform: translateY(-50%);
      }
      .search {
        position: relative;
        font-size: 12px;
        color: #fff;
        .playcount {
          position: absolute;
          right: 5px;
          top: 4px;
          span {
            margin-right: 5px;
            position: relative;
            top: 3px;
          }
        }
        .time {
          position: absolute;
          left: 3px;
          bottom: 3px;
        }
      }
    }
    p.title {
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span {
        color: #e77077;
        border: 1px solid #e77077;
        padding: 0 2px;
        margin-right: 5px;
      }
    }
    p.creator {
      .by {
        color: #0c73c2;
        margin-right: 5px;
      }
      .clickable:hover {
        color: #39c6ad;
        text-decoration: underline;
      }
      .divider {
        margin: 0 3px;
      }
    }
  }
}
</style>
