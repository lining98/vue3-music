<template>
  <!-- 专辑 -->
  <ul class="album">
    <li
      v-for="item in albumList"
      :key="item.id"
      @click="router.push({ name: 'albumDetail', query: item.id })"
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
import { onMounted, ref } from "vue";
import { getArtistAlbum } from "@/api/api";
import { useRouter } from "vue-router";
const router = useRouter();

const albumList = ref([]);
const props = defineProps<{ id: number }>();

// function imgerror(event){
//   var img = event.srcElement;
//   img.src = '@/assets/img/OpticalDisk.png'
//   img.onerror = null
// }

const getData = async () => {
  const { hotAlbums } = await getArtistAlbum(props.id);
  albumList.value = hotAlbums;
};
onMounted(getData);
</script>

<style lang="scss" scoped>
.album {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  //   justify-content: space-around;
  li {
    width: 200px;
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
  .image-slot{
    background-color: #c3c6c8;
    font-size: 14px;
    line-height: 200px;
    text-align: center;
  }
}
</style>
