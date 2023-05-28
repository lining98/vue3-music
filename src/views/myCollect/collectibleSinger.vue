<template>
  <div v-loading="loading">
    <CArtist :artists="artistList" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CArtist from "@/components/common/CArtist.vue";
import { getArtistSublist } from "@/api/collect";

const loading = ref(false);
const artistList = ref([]);
const getData = async () => {
  loading.value = true;
  const { data } = await getArtistSublist();
  artistList.value = data;
  loading.value = false;
};

onMounted(getData);
</script>

<style lang="scss" scoped></style>
