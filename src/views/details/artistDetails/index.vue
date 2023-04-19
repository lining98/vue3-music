<template>
  <div class="artist">
    <div class="info" v-loading="!artistDetail">
      <img :src="artistDetail.avatar" alt="" />
      <div class="detail">
        <h1>
          <el-tag effect="plain">歌手</el-tag>
          <span class="name">{{ artistDetail.name }}</span>
        </h1>

        <div class="subscription">
          <el-button type="danger" plain><i class="iconfont icon-shoucang"></i>关注</el-button>
        </div>

        <div class="count">
          <span class="songsCount">单曲数：{{ artistDetail.musicSize }}</span>
          <span class="collectionsCount">专辑数：{{ artistDetail.albumSize }}</span>
          <span class="videoCount">MV数：{{ artistDetail.mvSize }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="selectedTag" class="" v-loading="isLoading">
      <el-tab-pane label="热门歌曲" name="hotSongs">
        hotSongs
      </el-tab-pane>
      <el-tab-pane label="专辑" name="album">
        专辑
      </el-tab-pane>
      <el-tab-pane label="MV" name="mvist">
        mv
      </el-tab-pane>
      <el-tab-pane label="歌手描述" name="descrip">
        {{artistDetail.briefDesc}}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { onMounted, reactive, ref, toRefs } from "vue";
import {
  getArtistDetail,
  getArtistAlnum,
  getArtistMv,
  getArtistDesc,
  getArtistTopSong,
} from "@/api/api";
import { storeToRefs } from "pinia";
import { ElLoading, ElMessage } from "element-plus";

import MusicList from "@/components/common/musicList.vue";
import { useRoute } from "vue-router";

let isLoading = ref(true);
const artistDetail = ref({});

let selectedTag = ref('hotSongs')


const route = useRoute();
const id: number = Number(route.params.id);
async function getData() {
  isLoading.value = true
  // 获取歌手详情
  const details = await getArtistDetail(id);
  artistDetail.value = details.data.artist;

  isLoading.value = false
}

onMounted(() => {
  getData();
});

// let playlistsLoading = ref(true);
// let songsLoading = ref(true);
// function playList() {
//   playlistsLoading.value = true;
//   songsLoading.value = true;
//   getPlaylistDetail(playlistId.value)
//     .then((res) => {
//       if (res.code == 200) {
//         playlists.value = res.playlist;
//         musicLists.value = res.playlist.tracks;
//         playlistsLoading.value = false;
//       }
//     })
//     .catch((err) => {
//       ElMessage.error(err);
//     });
//   // .finally(() => loading.close());
//   getPlaylistTrackAll({ id: playlistId.value }).then((res) => {
//     if (res.code === 200) {
//       songs.value = res.songs;
//       songsLoading.value = false;
//     }
//   });
// }
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
        .name{
          margin-left: 10px;
        }
      }
      .count{
        margin-top: 15px;
        span{
          margin-right: 5px;
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}
</style>
