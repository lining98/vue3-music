<template>
  <div class="playlist">
    <div v-loading="playlistsLoading">
      <Info :playlist="playlists.value" :play-all="() => playAll()" />
    </div>
    <div v-loading="songsLoading">
      <MusicList :musicArr="songList" :showArName="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref, toRefs, watch } from "vue";
import { getPlaylistDetail, getPlaylistTrackAll } from "@/api/api";
import { ElMessage } from "element-plus";

import Info from "./Info.vue";
import MusicList from "@/components/common/MusicList.vue";
import { useRoute, useRouter } from "vue-router";
import { usePlayerStore } from "@/store/player";
import { storeToRefs } from "pinia";

const playlists = reactive([]);
const musicLists = reactive([]);
const songList = ref([]);

const route = useRoute();
const router = useRouter();

const { play, pushPlayList,randomPlay } = usePlayerStore();
const { loopType } = storeToRefs(usePlayerStore());
const playAll = () => {
  pushPlayList(true, ...songList.value);
  if (loopType.value) {
    play(songList.value[0].id);
  } else {
    randomPlay();
  }
};

watch(
  () => route.query.id,
  (newId) => {
    if (route.name == "playlist") {
      getData(Number(newId));
    }
  }
);

let playlistsLoading = ref(true);
let songsLoading = ref(true);

const getData = async (id: number) => {
  playlistsLoading.value = true;
  songsLoading.value = true;

  const { playlist } = await getPlaylistDetail(id);
  playlists.value = playlist;
  musicLists.value = playlist.tracks;
  playlistsLoading.value = false;

  const songsAll = await getPlaylistTrackAll(id);
  songList.value = songsAll.songs;
  songList.value.forEach((item: any, index: number) => (item.index = index + 1));
  songsLoading.value = false;
};

onMounted(async () => {
  getData(Number(route.query.id));
});
</script>

<style lang="scss" scoped></style>
