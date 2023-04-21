<template>
  <div class="playlist">
    <div v-loading="playlistsLoading">
      <Info :playlist="playlists.value" />
    </div>
    <hr />
    <div v-loading="songsLoading">
      <MusicList :musicArr="songs.value" :showArName="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref, toRefs, watch } from "vue";
import { getPlaylistDetail, getPlaylistTrackAll } from "@/api/api";
import { ElMessage } from "element-plus";

import Info from "./Info.vue";
import MusicList from "@/components/common/musicList.vue";
import { useRoute, useRouter } from "vue-router";

const playlists = reactive([]);
const musicLists = reactive([]);
const songs = reactive([]);

const route = useRoute();
const router = useRouter()


watch(()=>route.query.id, (newId) => {
  // console.log(typeof newId,newId);
  // console.log('route',route.name);
  if(route.name == 'playlist'){
    getData(Number(newId));
  }
});

let playlistsLoading = ref(true);
let songsLoading = ref(true);

const getData = async (id:number) => {
  playlistsLoading.value = true;
  songsLoading.value = true;

  const { playlist } = await getPlaylistDetail(id);
  playlists.value = playlist;
  musicLists.value = playlist.tracks;
  playlistsLoading.value = false;

  const songsAll = await getPlaylistTrackAll(id);
  songs.value = songsAll.songs;
  songsLoading.value = false;
};

onMounted(async () => {
  getData(Number(route.query.id));
});
</script>

<style lang="scss" scoped></style>