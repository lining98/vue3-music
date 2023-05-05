<template>
  <!-- 封装歌单、专辑的组件 -->
  <ul class="album">
    <li
      v-for="item in props.playlist"
      :key="item.id"
      @click="router.push({ name: 'albumDetail', query: { id: item.id } })"
    >
      <el-image :src="item.blurPicUrl">
        <template #placeholder>
          <div class="image-slot">加载中<span class="dot">...</span></div>
        </template>
      </el-image>
      <p>{{ item.name }}</p>
      <span></span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps(['playlist']);

</script>

<style lang="scss" scoped>
.album {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
    justify-content: space-around;
  li {
    width: 12.5rem;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    transition: all 0.3s;
    cursor: pointer;
    img {
      width: 100%;
      // height: 200px;
    }
    p {
      font-size: 14px;
    }
  }
  li:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 10px rgba($color: #c3c6c8, $alpha: 0.9);
  }
  .image-slot {
    background-color: #c3c6c8;
    font-size: 14px;
    line-height: 200px;
    text-align: center;
  }
}
</style>
