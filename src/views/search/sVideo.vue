<template>
  <div>{{ dataList.videoCount }}</div>
  <ul>
    <li v-for="item in dataList.videos">{{item.title}}</li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from "vue-router";

const route = useRoute()
import useSearchPage from './searchPage'
const {loading,dataList,getData} = useSearchPage()

watch(()=>route.fullPath,()=>{
  getData(0,30,1014)
})
onMounted(()=>{
  getData(0,30,1014)
})
</script>

<style lang="scss" scoped></style>
