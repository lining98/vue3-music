import { defineStore } from "pinia";
import { ref } from "vue";
import { IBanner } from "@/models/banner";
import { getBanner } from "@/api/api";

export const useBannerStore = defineStore("banner", () => {
  const banners = ref<IBanner[]>([]);
  let isLoading = ref(true)

  const getBanners = async () => {
    if (banners.value.length) return;
    banners.value = await getBanner();
    isLoading.value = false
  };

  return {
    banners,
    isLoading,
    getBanners,
  };
});
