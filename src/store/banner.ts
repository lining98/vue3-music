import { defineStore } from "pinia";
import { ref } from "vue";
import { IBanner } from "@/models/banner";
import { getBanner } from "@/utils/api";

export const useBannerStore = defineStore("banner", () => {
  const banners = ref<IBanner[]>([]);

  const getBanners = async () => {
    if (banners.value.length) return;
    banners.value = await getBanner();
  };

  return {
    banners,
    getBanners,
  };
});
