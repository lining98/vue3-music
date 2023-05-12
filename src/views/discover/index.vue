<template>
  <div class="discover">
    <h1>推荐</h1>
    <Banner class="banner" />
  </div>
</template>

<script setup lang="ts">
import Banner from "./banner.vue";
import {recommendSongs} from '@/api/discover'
import { onMounted } from "vue";

const getData = async()=>{
  const res = await recommendSongs()
  console.log(res);

}
onMounted(getData)
</script>

<style lang="scss" scoped>

</style>
