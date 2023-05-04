<template>
  <div>{{ msg }}</div>
  {{ albumsDetail }}
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getSearchResult } from "@/api/api";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";
const { keywords } = storeToRefs(useSearchStore());

const msg = ref("专辑");
const albumsDetail = ref([]);
const getData = async () => {
  const {albums} = await getSearchResult({
    keywords: keywords.value,
    type: 10,
  });
  albumsDetail.value = albums;
};
onMounted(getData);
</script>

<style lang="scss" scoped></style>
