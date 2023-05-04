<template>
  <!-- 轮播图 -->
  <div class="banners" v-loading="isLoading">
    <Swiper slides-per-group-auto slides-per-view="auto" :navigation="true" :grab-cursor="true">
    <!-- <Swiper slides-per-view="auto" :grab-cursor="true"> -->
      <SwiperSlide v-for="item in banners" :key="item.bannerId">
        <img
          :src="item.imageUrl"
          class="banner-image"
          @click="handleClick(item.targetId)"
        />
        <div class="type-title" :style="`background:${item.titleColor};`">
          {{ item.typeTitle }}
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { storeToRefs } from "pinia";
import { toRefs, onMounted, ref } from "vue";
import { useBannerStore } from "@/store/banner"; //状态管理 pinia
import { usePlayerStore } from "@/store/player";
import { useRouter } from "vue-router";

const { banners, isLoading } = toRefs(useBannerStore());
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
    default:
      open(item.url);
  }
}
</script>

<style lang="scss" scoped>
// 轮播
.swiper {
  .swiper-slide {
    overflow: hidden;
    border-radius: 5px;
    box-sizing: border-box;
    padding-left: 0.375rem;
    padding-right: 0.375rem;
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
      box-sizing: border-box;
    }
    .banner-image {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      transition: all 0.3s;
      cursor: pointer;
    }
    .banner-image:hover {
      // transform: scale(1.05);
      opacity: 0.8;
    }

    .type-title {
      font-size: 12px;
      color: #fff;
      position: absolute;
      right: 0.375rem;
      bottom: 5px;
      padding: 2px 8px;
      border-radius: 8px 0 8px 0;
    }
  }
}
</style>
