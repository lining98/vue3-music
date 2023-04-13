<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { toRefs, onMounted } from "vue";
import { useBannerStore } from "@/store/banner"; //状态管理 pinia
import { storeToRefs } from "pinia";

const { banners } = toRefs(useBannerStore());
const { getBanners } = useBannerStore();

onMounted(async () => {
  // 挂载完成
  await getBanners();
});
</script>

<template>
  <!-- <Swiper slides-per-group-auto slides-per-view="auto" :navigation="true" :grab-cursor="true"> -->
  <Swiper slides-per-view="auto" :grab-cursor="true">
    <SwiperSlide v-for="item in banners" :key="item.bannerId">
      <img :src="item.pic" class="banner-image" />
    </SwiperSlide>
  </Swiper>
</template>

<style lang="" scoped>
</style>
