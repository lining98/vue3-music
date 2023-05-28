<template>
  <div v-loading="loading">
    <CPlaylist :playlists="playlists" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CVideo from "@/components/common/CVideo.vue";
import CPlaylist from "@/components/common/CPlaylist.vue";
import { getRecentPlaylist } from "@/api/recent";

const loading = ref(false);
const playlists = ref([]);
const getData = async () => {
  loading.value = true;
  const { data } = await getRecentPlaylist();
  playlists.value = data.list;
  loading.value = false;
};

onMounted(getData);
</script>
