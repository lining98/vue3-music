<template>
  <!-- <ul>
    <li v-for="item in albumsDetail" :key="item.id">
      <el-image
        style="width: 100px; height: 100px"
        :src="item.picUrl"
      ></el-image>
      <p>{{ item.name }}</p>
    </li>
  </ul> -->
  <CPlayList :playlist='albumsDetail' />

</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { getSearchResult } from "@/api/api";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";
import { useRoute } from "vue-router";
const { keywords } = storeToRefs(useSearchStore());

import CPlayList from '@/components/common/CPlayList.vue'

const route = useRoute()
const msg = ref("专辑");
const albumsDetail = ref([]);
const getData = async () => {
  const { albums } = await getSearchResult({
    keywords: keywords.value,
    type: 10,
  });
  albumsDetail.value = albums;
};
watch(()=>route.fullPath,()=>{
  getData()
})
onMounted(getData);
</script>

<style lang="scss" scoped></style>
