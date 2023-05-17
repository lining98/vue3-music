<template>
  <!-- 封装歌手组件 -->
  <ul class="list">
    <li
      v-for="item in artists"
      :key="item.id"
      @click="router.push({ name: 'artistDetail', query: { id: item.id } })"
    >
      <div class="img">
        <el-image :src="item.img1v1Url"></el-image>
      </div>
      <p>{{ item.name }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

defineProps(["artists"]);
</script>

<style lang="scss" scoped>
.list {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  //   flex-wrap: wrap;
  li {
    width: 190px;
    font-size: 12px;
    margin-right: 15px;
    margin-bottom: 30px;
    cursor: pointer;
    .img {
      height: 190px;
      border: 1px solid #e0e0e0;
      :deep(.el-image__inner) {
        height: 190px;
      }
    }
    p {
      text-align: center;
    }
  }
}
</style>
