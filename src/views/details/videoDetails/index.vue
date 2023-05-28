<template>
  <div class="video-detail">
    <!-- 详情 -->
    <div class="video-content">
      <!-- 视频/MV 详细 -->
      <div class="detail">
        <Details :detail="detail" :videoUrl="videoUrl" />

        <!-- 评论 -->
        <Comment
          :id="route.query.id"
          :type="type === 'video' ? 5 : 1"
          :hotComents="hotComents"
          :newComents="newComents"
          :laoding="loading"
        />
      </div>
      <div class="recommend">
        <!-- 相关推荐 -->
        <RelatedVideo />
      </div>
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
import Comment from "@/components/common/Comment.vue";
import { storeToRefs } from "pinia";
import { useCommentStore } from "@/store/comment";

const { getComment } = useCommentStore();
const { hotComents, newComents, loading } = storeToRefs(useCommentStore());

const route = useRoute();
const type = route.query.type;

const detail = ref({});
const videoUrl = ref("");

const getData = async () => {
  const id = route.query.id;
  if (type === "video") {
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
onMounted(() => {
  getData();
  if (route.query.type === "video") {
    getComment({ id: route.query.id, type: 5 });
  } else {
    getComment({ id: route.query.id, type: 1 });
  }
});
</script>

<style lang="scss" scoped>
.video-detail {
  width: 1200px;
  // 详情
  .video-content {
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
}
</style>
