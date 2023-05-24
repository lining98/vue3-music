<template>
  <div v-loading="loading">
    <ul class="mv">
      <li v-for="item in mvList" :key="item.data.id">
        <div
          class="searchVideos"
          @click="toVideoDetails(item)"
        >
          <div class="search">
            <el-image class="img" :src="item.data.coverUrl" alt=""></el-image>
            <!-- <div class="playcount">
              <IconPark class="icon" :icon="VideoOne" size="18" />{{
                useNumberFormat(item.playTime)
              }}
            </div> -->
            <div class="time">{{ useFormatDuring(item.data.duration) }}</div>
          </div>
          <p class="title">
            <span v-if="item.type == 0">MV</span>{{ item.data.name }}
          </p>
          <p class="creator">
            <span v-if="item.type !== 0" class="by">by</span>
            <span v-for="(author, index) in item.data.artists" :key="author.id">
              <span class="clickable" @click="toSingerDetails(author.id)">
                {{ author.name }}
              </span>
              <span class="divider" v-if="index != item.data.artists.length - 1"
                >/</span
              >
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getRecentVideo } from "@/api/recent";
import { useRouter } from "vue-router";
import {useNumberFormat,useFormatDuring } from '@/utils/format'
import {VideoOne} from "@icon-park/vue-next"
import IconPark from '@/components/common/IconPark.vue'

const router = useRouter()

const loading = ref(false);
const mvList = ref([]);
const getData = async () => {
  loading.value = true;
  const { data } = await getRecentVideo();
  mvList.value = data.list;
  loading.value = false;
};

const toVideoDetails = (item: any) => {
  router.push({
    name: "videoDetails",
    query: { id: item.vid, type: item.type ? "video" : "mv" },
  });
};

onMounted(getData);
</script>

<style lang="scss" scoped>
.mv {
  display: grid;
  grid-template-columns: repeat(5,1fr);
  li {
    width: 260px;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s;
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
