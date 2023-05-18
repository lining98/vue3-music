<template>
  <h2 class="description">视频</h2>
  <div class="video">
    <CCategoryList :category='category' :group='group' />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {videoGroupList, videoCategoryList} from '@/api/video'
import CCategoryList from '@/components/common/CCategoryList.vue'

const category = ref([])
const group = ref([])

const getData = async()=>{
    const categoryData = await videoGroupList()
    category.value = categoryData.data
    const groupData = await videoCategoryList()
    group.value = groupData.data
}

onMounted(getData)

</script>

<style lang="scss" scoped></style>
