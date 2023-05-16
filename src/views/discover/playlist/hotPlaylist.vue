<template>
  <ul class="hot-tags">
    <li v-for="item in tags" :key="item.id">{{item.name}}</li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getPlaylistHot } from "@/api/discover";import { storeToRefs } from "pinia";
import { useDiscoverStore } from '@/store/discover'

const { cat } = storeToRefs(useDiscoverStore())

const tags = ref([])

const getData = async () => {
  const res = await getPlaylistHot();
  tags.value = res.tags
};

onMounted(getData)
</script>

<style lang="scss" scoped>
.hot-tags{
    display: flex;
    li{
        margin-left: 10px;
        cursor: pointer;
        &:hover{
            color: #34d399;
        }
    }
}
</style>
