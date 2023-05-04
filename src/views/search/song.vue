<template>
  <div>{{ msg }}</div>
  <MusicList :musicArr="songList" :showArName="true" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getSearchResult } from "@/api/api";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";
import MusicList from "@/components/common/musicList.vue";

const { keywords } = storeToRefs(useSearchStore());

const msg = ref("单曲");
const songList = ref([]);
const getData = async () => {
  const { songs } = await getSearchResult({
    keywords: keywords.value,
    type: 1,
  });
  songList.value = songs;
};
onMounted(getData);
</script>

<style lang="scss" scoped></style>
