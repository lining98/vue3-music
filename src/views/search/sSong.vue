<template>
  <div>共搜到{{ count }}首音乐</div>
  <div v-loading="loading">
    <MusicList :musicArr="songList" :showArName="true" />
  </div>
  <CPagination
    :count="count"
    @sizeChange="handleChangePage"
    @currentChange="handleChangeCurrent"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { getSearchResult } from "@/api/api";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";
import { useRoute } from "vue-router";
import MusicList from "@/components/common/musicList.vue";
import CPagination from "@/components/common/CPagination.vue";
const route = useRoute();

const { keywords } = storeToRefs(useSearchStore());

const count = ref(0);
const songList = ref([]);
const loading = ref(true);
const offset = ref(0);
const limit = ref(30);

const getData = async (offset: number, limit: number) => {
  loading.value = true;
  const { songs, songCount } = await getSearchResult({
    keywords: keywords.value,
    type: 1,
    offset: offset,
    limit: limit,
  });
  count.value = songCount;
  songList.value = songs;
  songList.value.forEach(
    (item: any, index: number) => (item.index = index + 1)
  );
  loading.value = false;
};
const handleChangePage = (val: any) => {
  limit.value = val;
  getData(offset.value, limit.value);
};
const handleChangeCurrent = (val: any) => {
  offset.value = limit.value * (val-1);
  getData(offset.value, limit.value);
};
watch(
  () => route.fullPath,
  () => {
    getData(0, 30);
  }
);
onMounted(() => {
  getData(0, 30);
});
</script>

<style lang="scss" scoped></style>
