<template>
  <div class="artist">
    <div class="info" v-loading="isLoading">
      <img :src="artistDetail.cover" alt="" />
      <div class="detail">
        <h1>
          <el-tag effect="plain">歌手</el-tag>
          <span class="name">{{ artistDetail.name }}</span>
        </h1>

        <div class="subscription">
          <el-button type="danger" plain
            ><i class="iconfont icon-shoucang"></i>关注</el-button
          >
        </div>

        <div class="count">
          <span class="songsCount">单曲数：{{ artistDetail.musicSize }}</span>
          <span class="collectionsCount"
            >专辑数：{{ artistDetail.albumSize }}</span
          >
          <span class="videoCount">MV数：{{ artistDetail.mvSize }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="selectedTag"  v-loading="isLoading">
      <el-tab-pane label="热门歌曲" name="hotSongs">
        <el-button size="default" round @click="playAll">
          <IconPark :icon="PlayOne" class="mr-1" size="14" />
          播放全部
        </el-button>

        <MusicList :musicArr="songList" :showArName="false" />
      </el-tab-pane>
      <!-- <el-tab-pane :label=:"全部歌曲`${artistDetail.musicSize}`" name="hotSongs">
      <MusicListAll :musicArr="songlistall" />
      </el-tab-pane> -->
      <el-tab-pane
        :label="`专辑 ${artistDetail?.albumSize || ''}`"
        name="album"
      >
        <CAlbum :playlist='albumList' />
      </el-tab-pane>
      <el-tab-pane :label="`MV ${artistDetail?.mvSize || ''}`" name="mvist">
        <CVideo :mvlist="mvlist" />
      </el-tab-pane>
      <el-tab-pane label="歌手描述" class="descrip" name="descrip">
        {{ artistDetail.briefDesc }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { onMounted, reactive, ref, toRefs, watch } from "vue";
import {
  // getArtists,
  getArtistAlbum,
  getArtistMv,
  getArtistDetail,
  getArtistDesc,
  getArtistTopSong,
} from "@/api/api";
import { storeToRefs } from "pinia";
import { ElLoading, ElMessage } from "element-plus";
import { PlayOne } from "@icon-park/vue-next";
import IconPark from "@/components/common/IconPark.vue";

import MusicList from "@/components/common/musicList.vue";
import CAlbum from '@/components/common/CAlbum.vue'
import CVideo from '@/components/common/CVideo.vue'
// import MusicListAll from "@/components/common/musicListAll.vue";
import { useRoute } from "vue-router";

import { usePlayerStore } from "@/store/player";
const { play, pushPlayList, randomPlay } = usePlayerStore();
const { loopType } = storeToRefs(usePlayerStore());

let isLoading = ref(true);
const artistDetail = ref({});
const songList = ref([]);
const albumList = ref([]);
const mvlist = ref([]);

let selectedTag = ref("hotSongs");

const route = useRoute();
const id = Number(route.query.id);

const playAll = () => {
  pushPlayList(true, ...songList.value);
  if (loopType.value) {
    play(songList.value[0].id);
  } else {
    randomPlay();
  }
};

async function getData(artId: number) {
  if (artId == 0) {
    return ElMessage.error("无相关艺人");
  }
  isLoading.value = true;
  // 获取歌手详情
  const details = await getArtistDetail(artId);
  artistDetail.value = details.data.artist;

  // 获取歌手最热50首歌曲
  const hotSongsdetail = await getArtistTopSong(artId);
  songList.value = hotSongsdetail.songs;
  songList.value.forEach(
    (item: any, index: number) => (item.index = index + 1)
  );

  // 获取歌手专辑
  const { hotAlbums } = await getArtistAlbum(artId);
  albumList.value = hotAlbums;

  // 获取歌手MV
  const mvDetails = await getArtistMv(artId);
  mvlist.value = mvDetails.mvs;

  // 获取全部歌曲
  // const allSongs = await getArtists(id);
  // songalllist.value = allSongs.songs;

  isLoading.value = false;
}

watch(()=>route.query.id,()=>{
  if(route.name === 'artistDetail'){
    getData(Number(route.query.id))
  }
})

onMounted(() => {
  getData(id);
});
</script>

<style lang="scss" scoped>
.artist {
  min-height: 200px;
  .info {
    display: flex;
    font-size: 12px;
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
      .count {
        margin-top: 15px;
        span {
          margin-right: 5px;
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
  .descrip {
    text-indent: 2em;
    font-size: 14px;
  }
}
</style>
