<template>
  <ul class="mv">
    <li v-for="item in props.mvlist" :key="item.id">
      <el-image :src="item.imgurl16v9" alt=""></el-image>
      <p>{{ item.name }}</p>
      <!-- <span></span>
        {{item.name}} -->
    </li>
  </ul>
</template>

<script setup lang="ts">
import { getArtistMv } from "@/api/api";

const props = defineProps(['mvlist']);

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
