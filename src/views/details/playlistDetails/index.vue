<template>
  <div class="playlist">
    <div v-loading="playlistsLoading">
      <Info :playlist="playlists.value" />
    </div>
    <hr />
    <div v-loading="songsLoading">
      <MusicList :musicArr="songs.value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { onBeforeMount, reactive, ref, toRefs, watch } from "vue";
import { getPlaylistDetail, getPlaylistTrackAll } from "@/api/api";
import { usePlaylistDetail } from "@/store/playlistDetail";
import { ElMessage } from "element-plus";

import Info from "./Info.vue";
import MusicList from "@/components/common/musicList.vue";

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

let playlistsLoading = ref(true);
let songsLoading = ref(true);
function playList() {
  playlistsLoading.value = true;
  songsLoading.value = true;
  getPlaylistDetail(playlistId.value)
    .then((res) => {
      if (res.code == 200) {
        playlists.value = res.playlist;
        musicLists.value = res.playlist.tracks;
        playlistsLoading.value = false;
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
  getPlaylistTrackAll({ id: playlistId.value }).then((res) => {
    if (res.code === 200) {
      songs.value = res.songs;
      songsLoading.value = false;
    }
  });
}
</script>

<style lang="scss" scoped></style>
