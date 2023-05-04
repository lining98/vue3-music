<template>
  <div>{{ msg }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getSearchResult } from "@/api/api";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";
const { keywords } = storeToRefs(useSearchStore());

const msg = ref("视频");
getSearchResult({ keywords: keywords.value,type:1014 });
</script>

<style lang="scss" scoped></style>
