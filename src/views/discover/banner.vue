<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { storeToRefs } from "pinia";
import { toRefs, onMounted } from "vue";
import { useBannerStore } from "@/store/banner"; //状态管理 pinia
import { usePlayerStore } from "@/store/player";

const { banners } = toRefs(useBannerStore());
// const { banners } = storeToRefs(useBannerStore()); //两个方法都可以获取数据

const { getBanners } = useBannerStore();
const { play } = usePlayerStore();

onMounted(async () => {
  // 挂载完成
  await getBanners();
});

function handle(id: number) {
  play(id);
}
</script>

<template>
  <!-- <Swiper slides-per-group-auto slides-per-view="auto" :navigation="true" :grab-cursor="true"> -->
  <Swiper slides-per-view="auto" :grab-cursor="true">
    <SwiperSlide v-for="item in banners" :key="item.bannerId">
      <img
        :src="item.pic"
        class="banner-image"
        @click="handle(item.targetId)"
      />
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss" scoped>
// 轮播
.swiper {
  .swiper-slide {
    overflow: hidden;
    border-radius: 5px;
    // height: 140px;
    @media (min-width: 768px) {
      width: 100%;
    }
    @media (min-width: 1024px) {
      width: 50%;
    }
    @media (min-width: 1280px) {
      width: 33.33%;
    }
    @media (min-width: 1536px) {
      width: 25%;
    }
    box-sizing: border-box;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
  }
  .banner-image {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    transition: all 0.3s;
  }
  .banner-image:hover {
    // transform: scale(1.05);
    opacity: 0.8;
  }
}
</style>
