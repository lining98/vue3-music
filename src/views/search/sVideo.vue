<template>
  <div v-loading="loading">
    <div class="scount">共搜到<span>{{ dataList.videoCount }}</span>个视频</div>
    <CVideo :mvlist="dataList.videos">
      <template #artVideos></template>
    </CVideo>
    <!-- <ul>
      <li v-for="item in dataList.videos">{{ item.title }}</li>
    </ul> -->
    <CPagination
      v-if="dataList.videoCount > 30"
      :count="dataList.videoCount"
      @sizeChange="handleChangePage"
      @currentChange="handleChangeCurrent"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import CPagination from "@/components/common/CPagination.vue";
import CVideo from '@/components/common/CVideo.vue'

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
    if (Number(route.query.type) == 1014) {
      getData(0, 30, 1014);
    }
  }
);
onMounted(() => {
  getData(0, 30, 1014);
});
</script>

<style lang="scss" scoped></style>
