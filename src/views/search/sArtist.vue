<template>
  <div v-loading="loading">
    <div class="scount">
      共搜到<span>{{ dataList.artistCount }}</span
      >个歌手
    </div>
    <CArtist :artists="dataList.artists" />
    <!-- <ul class="list">
      <li
        v-for="item in dataList.artists"
        :key="item.id"
        @click="router.push({ name: 'artistDetail', query: { id: item.id } })"
      >
        <div class="img">
          <el-image :src="item.img1v1Url"></el-image>
        </div>
        <p>{{ item.name }}</p>
      </li>
    </ul> -->
    <CPagination
      v-if="dataList.artistCount > 30"
      :count="dataList.artistCount"
      @sizeChange="handleChangePage"
      @currentChange="handleChangeCurrent"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import CArtist from "@/components/common/CArtist.vue";
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
    if (Number(route.query.type) == 100) {
      getData(0, 30, 100);
    }
  }
);
onMounted(() => {
  getData(0, 30, 100);
});
</script>

<style lang="scss" scoped></style>
