<template>
  <div v-loading="loading">
    <div class="count">共搜到<span>{{ dataList.playlistCount }}</span>个歌单
    </div>
    <ul>
      <li v-for="item in dataList.playlists" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    <CPagination
      v-if="dataList.playlistCount > 30"
      :count="dataList.playlistCount"
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
const type = route.query.type;
import useSearchPage from "./searchPage";
const { info, loading, dataList, getData } = useSearchPage();

const handleChangePage = (val: any) => {
  info.limit = val;
  getData(info.offset, info.limit, type);
};
const handleChangeCurrent = (val: any) => {
  info.offset = info.limit * (val - 1);
  getData(info.offset, info.limit, type);
};

watch(
  () => route.fullPath,
  () => {
    if (Number(route.query.type) == 1000) {
      getData(0, 30, 1000);
    }
  }
);
onMounted(() => {
  getData(0, 30, 1000);
});
</script>

<style lang="scss" scoped></style>
