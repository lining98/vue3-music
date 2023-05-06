<template>
  <div v-loading='loading'>
    {{dataList.playlistCount}}
    <!-- {{dataList.count}} -->
    <ul>
      <li v-for="item in dataList.playlists" :key="item.id">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from "vue-router";

const route = useRoute()
import useSearchPage from './searchPage'
const {loading,dataList,getData} = useSearchPage()

console.log(route);

watch(()=>route.fullPath,()=>{
  console.log(111);

  getData(0,30,1000)
})
onMounted(()=>{
  getData(0,30,1000)
})
</script>

<style lang="scss" scoped></style>
