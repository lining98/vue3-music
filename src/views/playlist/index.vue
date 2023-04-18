<template>
  <div class="playlist">
    <Info :playlist="playlists.value" />
    <hr />
    <MusicList :musicArr="songs.value" />
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { onBeforeMount, reactive, ref, toRefs, watch } from "vue";
import { getPlaylistDetail, getPlaylistTrackAll } from "@/api/api";
import { storeToRefs } from "pinia";
import { usePlaylistDetail } from "@/store/playlistDetail";
import { ElLoading, ElMessage } from "element-plus";

import Info from "./Info.vue";
import MusicList from "./musicList.vue";

const playlists = reactive([]);
const musicLists = reactive([]);
const songs = reactive([]);

const { playlistId } = toRefs(usePlaylistDetail());

watch(playlistId, () => {
  playList();
});
onBeforeMount(async () => {
  playList();
});
function playList() {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
  });
  getPlaylistDetail(playlistId.value)
    .then((res) => {
      if (res.code == 200) {
        playlists.value = res.playlist;
        musicLists.value = res.playlist.tracks;
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    })
    .finally(() => loading.close());
  getPlaylistTrackAll({ id: playlistId.value }).then((res) => {
    songs.value = res.songs;
  });
}
</script>

<style lang="scss" scoped></style>
