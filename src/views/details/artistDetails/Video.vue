<template>
  <ul class="mv">
    <li v-for="item in mvlist" :key="item.id">
      <el-image :src="item.imgurl16v9" alt=""></el-image>
      <p>{{ item.name }}</p>
      <!-- <span></span>
        {{item.name}} -->
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getArtistMv } from "@/api/api";

const mvlist = ref([]);
const props = defineProps<{ id: number }>();

const getData = async () => {
  const mvDetails = await getArtistMv(props.id);
  mvlist.value = mvDetails.mvs;
};
onMounted(getData);
</script>

<style lang="scss" scoped>
.mv {
  display: flex;
  flex-wrap: wrap;
  li {
    width: 260px;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s;
    img {
      width: 100%;
    }
    p {
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  li:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 10px rgba($color: #c3c6c8, $alpha: 0.9);
  }
}
</style>
