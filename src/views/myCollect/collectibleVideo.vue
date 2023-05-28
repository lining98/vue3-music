<template>
  <div v-loading="loading">
    <CVideo :mvlist="mvList" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CVideo from "@/components/common/CVideo.vue";
import { getMVSublist } from "@/api/collect";

const loading = ref(false);
const mvList = ref([]);
const getData = async () => {
  loading.value = true;
  const { data } = await getMVSublist();
  mvList.value = data;
  loading.value = false;
};

onMounted(getData);
</script>

<style lang="scss" scoped></style>
