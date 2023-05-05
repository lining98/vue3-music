<template>
  <div>{{ msg }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getSearchResult } from "@/api/api";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";
const { keywords } = storeToRefs(useSearchStore());

const msg = ref("歌词");
getSearchResult({ keywords: keywords.value,type:1006 });
</script>

<style lang="scss" scoped></style>
