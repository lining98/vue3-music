<template>
  <CategoryList :category="category" :group="group" />
    <!-- :infinite-scroll-disabled="disabled" -->
  <div
    class="videos"
    v-infinite-scroll="load"
    :infinite-scroll-distance="400"
    :infinite-scroll-immediate="false"
  >
    <Videos :videos="videos" :isMv='false' :loading='loading' />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getVideoGroupList, getVideoCategoryList } from "@/api/video";
import { storeToRefs } from "pinia";
import { useVideoStore } from "@/store/video";
import CategoryList from "../videoList/categoryList.vue";
import Videos from "../component/videos.vue";

const { cat, catId, videos, loading ,time} = storeToRefs(useVideoStore());
const { getMoreVideos } = useVideoStore();


const category = ref([]);
const group = ref([]);

const getData = async () => {
  time.value = 0;
  const categoryData = await getVideoGroupList();
  category.value = categoryData.data;
  const groupData = await getVideoCategoryList();
  group.value = groupData.data;
  cat.value = category.value[0].name;
  catId.value = category.value[0].id;
  loading.value = true;
  getMoreVideos();
  loading.value = false;
};

const load = () => {
  getMoreVideos();
};

onMounted(getData);
</script>

<style lang="scss" scoped></style>
