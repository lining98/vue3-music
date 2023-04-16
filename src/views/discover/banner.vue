<template>
  <el-carousel
    :interval="4000"
    indicator-position="none"
    type="card"
    height="230px"
  >
    <el-carousel-item
      class="carousel"
      v-for="item in banners"
      :key="item.targetId"
    >
      <div class="img-card">
        <img
          :src="item.imageUrl"
          class="banner-image"
          @click="handleClick(item)"
        />
        <div class="type-title" :style="`background:${item.titleColor};`">
          {{ item.typeTitle }}
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { toRefs, onMounted } from "vue";
import { useBannerStore } from "@/store/banner"; //状态管理 pinia
import { usePlayerStore } from "@/store/player";
import { useRouter } from "vue-router";

const { banners } = toRefs(useBannerStore());
// const { banners } = storeToRefs(useBannerStore()); //两个方法都可以获取数据

const router = useRouter();
const { getBanners } = useBannerStore();
const { play } = usePlayerStore();

onMounted(async () => {
  // 挂载完成
  await getBanners();
});

function handleClick(item: any) {
  switch (item.targetType) {
    case 1:
      play(item.targetId);
      break;
    case 10:
      router.push("/music");
      break;
    // case 1:
    //   break;
    // case 1:
    //   break;
    default:
      open(item.url);
  }
}
</script>

<style lang="scss" scoped>
// 轮播
.carousel {
  .img-card {
    position: relative;
    .banner-image {
      width: 100%;
      border-radius: 8px;
      transition: all 0.3s;
    }
    .type-title {
      font-size: 12px;
      color: #fff;
      position: absolute;
      right: 0px;
      bottom: 9px;
      padding: 2px 8px;
      border-radius: 8px 0 8px 0;
    }
  }
}
</style>
