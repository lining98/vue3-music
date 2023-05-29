<template>
  <!-- 封装评论组件 -->
  <div class="comment">
    <!-- 评论区 -->
    <div class="submitComment">
      <el-input
        v-model="params.content"
        type="textarea"
        show-word-limit
        maxlength="140"
        placeholder="留下你的评论"
      ></el-input>
      <el-button type="primary" @click="sendComment">评论</el-button>
    </div>
    <div>
      <div v-if="type === 0">
        <CommentList title="热门评论" :comments="hotComents" :isHot="true" :isSong ='true' />
        <CommentList title="最新评论" :comments="newComents" :isHot="false" :isSong ='true' />
      </div>
      <div v-else>
        <CommentList title="热门评论" :comments="hotComents" :isHot="true" :isSong ='false' />
        <CommentList title="最新评论" :comments="newComents" :isHot="false"  :isSong ='false'/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useCommentStore } from "@/store/comment";
import { comment } from "@/api/comment";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { getCommentLike } from "@/api/comment";
import { throttle, debounce } from "@/utils/utils";
import CommentList from "./CommentList.vue";

const { loadingHot, loadingNew, hotCommentIds } = storeToRefs(
  useCommentStore()
);

const { getComment, commentNew, commentSongNew } = useCommentStore();
const { id, type, hotComents, newComents } = defineProps([
  "id",
  "type",
  "hotComents",
  "newComents",
]);
const params = reactive({
  t: 1,
  id: id,
  type: type,
  content: "",
});
// 发送评论
const sendComment = throttle(async () => {
  const res = await comment(params);
  if (res.code === 200) {
    ElMessage.success("评论成功");
    setTimeout(() => {
      params.type === 0
        ? commentSongNew({ id: id, type: type })
        : commentNew({ id: id, type: type });
    }, 500);

    params.content = "";
  } else {
    ElMessage.error(res.message);
  }
}, 800);

</script>

<style lang="scss" scoped>
.comment {
  margin-top: 15px;
  //   评论区
  .submitComment {
    overflow: hidden;
    button {
      float: right;
      margin-top: 10px;
    }
  }
}
</style>
