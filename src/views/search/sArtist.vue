<template>
  <div class="count">共搜到<span>{{ count }}</span>个歌手</div>
  <ul class="list" v-loading="loading">
    <li v-for="item in artistList" :key="item.id">
      <div class="img">
        <el-image :src="item.img1v1Url"></el-image>
      </div>
      <p>{{ item.name }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { getSearchResult } from "@/api/api";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";
import { useRoute } from "vue-router";
const route = useRoute();
const { keywords } = storeToRefs(useSearchStore());

const count = ref(0);
const artistList = ref([]);
const loading = ref(true);
const getData = async () => {
  loading.value = true;
  const { artists, artistCount } = await getSearchResult({
    keywords: keywords.value,
    type: 100,
  });
  artistList.value = artists;
  count.value = artistCount;
  loading.value = false;
};
watch(
  () => route.fullPath,
  () => {
    getData();
  }
);
onMounted(getData);
</script>

<style lang="scss" scoped>
.count {
  font-size: 12px;
  span {
    color: #c20c0c;
    margin: 0 3px;
  }
}
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
      :deep(.el-image__inner){
        height: 130px;
      }
    }
  }
}
</style>
