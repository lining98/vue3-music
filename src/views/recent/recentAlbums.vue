<template>
  <div v-loading="loading">
    <CAlbum :albumlist="albumList" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CAlbum from "@/components/common/CAlbum.vue";
import { getRecentAlbum } from "@/api/recent";

const loading = ref(false);
const albumList = ref([]);
const getData = async () => {
  loading.value = true;
  const { data } = await getRecentAlbum();
  albumList.value = data.list;
  loading.value = false;
};

onMounted(getData);
</script>

<style lang="scss" scoped></style>
