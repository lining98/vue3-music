<template>
  <div v-loading="loading">
    <div class="count">共搜到<span>{{ dataList.songCount }}</span>个歌词
    </div>
    <ul>
      <li v-for="item in dataList.songs">{{ item.name }}</li>
    </ul>
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
    if (Number(route.query.type) == 1006) {
      getData(0, 30, 1006);
    }
  }
);
onMounted(() => {
  getData(0, 30, 1006);
});
</script>

<style lang="scss" scoped></style>
