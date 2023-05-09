<template>
  <div v-loading="loading">
    <div class="scount">
      共搜到<span>{{ dataList.artistCount }}</span
      >个歌手
    </div>
    <ul class="list">
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
    </ul>
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
import { useRoute, useRouter } from "vue-router";
import CPagination from "@/components/common/CPagination.vue";

const route = useRoute();
const router = useRouter()
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

<style lang="scss" scoped>
.list {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 130px;
    font-size: 12px;
    margin-right: 15px;
    margin-bottom: 20px;
    cursor: pointer;
    .img {
      height: 130px;
      border: 1px solid #e0e0e0;
      :deep(.el-image__inner) {
        height: 130px;
      }
    }
  }
}
</style>
