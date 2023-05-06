<template>
  <div>{{ dataList.songCount }}</div>
  <ul>
    <li v-for="item in dataList.songs">{{item.name}}</li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from "vue-router";

const route = useRoute()
import useSearchPage from './searchPage'
const {loading,dataList,getData} = useSearchPage()

watch(()=>route.fullPath,()=>{
  getData(0,30,1006)
})
onMounted(()=>{
  getData(0,30,1006)
})
</script>

<style lang="scss" scoped></style>
