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
// .banner-image {
// height: 40px;
// }
</style>
