<template>
  <div class="video-detail">
    <!-- 视频/MV 详细 -->
    <div class="detail">
      <Details :detail="detail" :videoUrl='videoUrl' />
    </div>
    <div class="recommend">
        <!-- 相关推荐 -->
     <RelatedVideo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  getVideoDetail,
  getMvDetail,
  getVideoUrl,
  getMvUrl,
} from "@/api/video";
import { useRoute } from "vue-router";
import Details from "./Details.vue";
import RelatedVideo from "./RelatedVideo.vue";

const route = useRoute();
const type = route.query.type;

const detail = ref({});
const videoUrl = ref("");

const getData = async () => {
  const id = route.query.id;
  if (route.query.type === "video") {
    const { data } = await getVideoDetail(String(id));
    const { urls } = await getVideoUrl(String(id));
    detail.value = data;
    videoUrl.value = urls[0]?.url;
  } else {
    const { data } = await getMvDetail(Number(id));
    const res = await getMvUrl(Number(id));
    detail.value = data;
    videoUrl.value = res.data?.url;
    detail.value = data;
  }
};
onMounted(getData);
</script>

<style lang="scss" scoped>
.video-detail {
    width: 1200px;
  display: flex;
  justify-content: space-between;
  .detail {
    // flex: 1;
    width: 700px;
    padding-right: 30px;
  }
  .recommend {
    width: 400px;
  }
}
</style>
