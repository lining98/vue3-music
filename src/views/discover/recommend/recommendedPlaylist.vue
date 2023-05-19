<template>
  <h2>推荐歌单</h2>
  <ul class="list">
    <li
      v-for="item in playlist"
      :key="item.id"
      @click="router.push({ name: 'playlist', query: { id: item.id } })"
    >
      <div class="img">
        <img :src="item.picUrl" alt="" />
      </div>
      <p class="ellipsis">{{ item.name }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getGersonalized } from "@/api/discover";
import { useRouter } from "vue-router";

const router = useRouter();

const playlist = ref([]);

const getData = async () => {
  const { result } = await getGersonalized();
  playlist.value = result;
};

onMounted(getData);
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  // flex-wrap: wrap;
  li {
    width: 13rem;
    margin: 0 0.5rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    .img {
      overflow: hidden;
      border-radius: 10px;
      height: 13rem;
      img {
        transition: all 0.3s;
        width: 100%;
        height: 100%;
      }
    }
    &:hover img {
      transform: scale(1.05);
    }
  }
}
</style>
