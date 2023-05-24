<template>
  <!-- 封装歌单列表显示 -->
  <div class="playlists">
    <div
      class="item"
      v-for="item in playlists"
      :key="item.id"
      @click="router.push({ name: 'playlist', query: { id: item.id } })"
    >
      <el-card shadow="hover" :body-style="{ padding: '0.5rem' }">
        <el-image :src="item.coverImgUrl || item.picUrl">
          <template #placeholder>
            <div class="image-slot">加载中<span class="dot">...</span></div>
          </template>
        </el-image>
        <div class="name">
          <p class="ellipsis">{{ item.name }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { playlists } = defineProps(["playlists"]);
</script>

<style lang="scss" scoped>
.playlists {
  display: grid;
  // 每行5个
  grid-template-columns: repeat(5, 1fr);

  .item {
    width: 13rem;
    margin: 1rem 0.5rem;
    cursor: pointer;

    .el-image {
      width: 100%;
      min-height: 10rem;
      border-radius: 0.5rem;
    }

    span {
      display: block;
      height: auto;
      text-align: center;
      font-size: 13px;
    }
  }
}
</style>
