<template>
  <div>共搜到{{ dataList.songCount }}首音乐</div>
  <div v-loading="loading">
    <MusicList
      :musicArr="dataList.songs"
      :showArName="true"
      :showLike="false"
    />
    <CPagination
      v-if="dataList.songCount > 30"
      :count="dataList.songCount"
      @sizeChange="handleChangePage"
      @currentChange="handleChangeCurrent"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import CPagination from "@/components/common/CPagination.vue";

const route = useRoute();
import useSearchPage from "./searchPage";
const { info, loading, dataList, getData } = useSearchPage();

const handleChangePage = (val: any, type: number) => {
  info.limit = val;
  getData(info.offset, info.limit, type);
};
const handleChangeCurrent = (val: any, type: number) => {
  info.offset = info.limit * (val - 1);
  getData(info.offset, info.limit, type);
};

watch(
  () => route.fullPath,
  () => {
    if (Number(route.query.type) == 1) {
      getData(0, 30, 1);
    }
  }
);
onMounted(async () => {
  getData(0, 30, 1);
});
</script>

<style lang="scss" scoped></style>
