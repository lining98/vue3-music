<template>
  <!-- 每日推荐 -->
  <div class="daily">
    <DailyTop />
    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲" name="songs" v-loading="songsLoading">
        <MusicList
          :musicArr="dailySongs"
          :showArName="true"
          :showLike="false"
        />
      </el-tab-pane>
      <el-tab-pane label="歌单" name="resource" v-loading="resourceLoading">
        <CPlaylist :playlists="dailyResource" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { recommendSongs, recommendResource } from "@/api/discover";
import DailyTop from "./DailyTop.vue";
import MusicList from "@/components/common/MusicList.vue";
import CPlaylist from "@/components/common/CPlaylist.vue";

const activeName = ref("songs");
const songsLoading = ref(false);
const resourceLoading = ref(false);
const dailySongs = ref([]);
const dailyResource = ref([]);

const getData = async () => {
  songsLoading.value = true;
  const { data } = await recommendSongs();
  dailySongs.value = data.dailySongs;
  songsLoading.value = false;
  resourceLoading.value = true;
  const { recommend } = await recommendResource();
  dailyResource.value = recommend;
  resourceLoading.value = false;
};

onMounted(getData);
</script>

<style lang="scss" scoped></style>
