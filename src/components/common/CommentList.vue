<template>
  <h2 v-if="comments.length">{{ title }}</h2>
  <ul class="list">
    <li v-for="item in comments" :key="item.commentId">
      <div
        class="item-content"
        v-if="
          isHot ||
          (hotCommentIds.indexOf(item.commentId) == -1 &&
            hotSongCommentIds.indexOf(item.commentId) == -1)
        "
      >
        <el-image lazy class="img" :src="item.user.avatarUrl" alt="" />
        <div class="item">
          <p>
            <span class="name">{{ item.user.nickname }} ：</span>
            <span>{{ item.content }}</span>
          </p>
          <!-- 回复 -->
          <div
            class="reply"
            v-if="isHot ? item.beReplied.length : item.beReplied"
          >
            <div v-for="ite in item.beReplied" :key="ite.beRepliedCommentId">
              <span class="name">@{{ ite.user.nickname }} ：</span>
              <p>{{ ite.content }}</p>
            </div>
          </div>
          <div class="bottom">
            <span class="time">{{ item.timeStr }}</span>
            <div class="zan">
              <el-popconfirm
                v-if="item.owner"
                confirm-button-text="确定"
                cancel-button-text="取消"
                title="确定删除评论？"
                @confirm="commentDel(item, isSong)"
              >
                <template #reference>
                  <el-button link class="del">删除</el-button>
                </template>
              </el-popconfirm>
              <span
                class="mg"
                :class="item.liked ? 'like' : ''"
                @click="commentLike(item, isSong)"
                ><IconPark :icon="ThumbsUp" />{{ item.likedCount }}</span
              >
              <span @click="reply(item)"><IconPark :icon="Comment" /></span>
            </div>
          </div>
        </div>
      </div>
      <el-divider
        v-if="
          isHot ||
          (hotCommentIds.indexOf(item.commentId) == -1 &&
            hotSongCommentIds.indexOf(item.commentId) == -1)
        "
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import IconPark from "@/components/common/IconPark.vue";
import { ThumbsUp, Comment } from "@icon-park/vue-next";
import { storeToRefs } from "pinia";
import { useCommentStore } from "@/store/comment";
import { ElMessage } from "element-plus";
import { comment, getCommentLike } from "@/api/comment";
import { throttle } from "@/utils/utils";
import { useRoute } from "vue-router";
import { usePlayerStore } from "@/store/player";

const { hotCommentIds, hotSongCommentIds } = storeToRefs(useCommentStore());
const { commentSongNew, commentNew, getComment, getSongComment } =
  useCommentStore();
const route = useRoute();
const { id } = storeToRefs(usePlayerStore());

const formatType = (type: string) => {
  switch (type) {
    case "playlist":
      return 2;
    case "albumDetail":
      return 3;
    case "videoDetails":
      return "video";
  }
};
const params = reactive({
  id: route.query.id,
  type: formatType(route.name),
});

defineProps<{
  title: string;
  comments: [];
  isHot: boolean;
  isSong: boolean;
  reply?: () => void;
}>();

// 删除评论
const commentDel = throttle(async (item: any, isSong) => {
  if (params.type === "video") {
    params.type = route.query.type === "mv" ? 1 : 5;
  }
  if (isSong) {
    // 是否为歌曲
    params.type = 0;
    params.id = id.value;
  }
  const delParams = {
    t: 0,
    type: params.type,
    id: params.id,
    threadId: "",
    commentId: 0,
  };

  delParams.threadId = item.threadId;
  delParams.commentId = item.commentId;
  const res = await comment(delParams);
  if (res.code === 200) {
    ElMessage.success("删除评论成功");

    params.type === 0
      ? commentSongNew({ id: id.value, type: 0 })
      : commentNew({ id: params.id, type: params.type });
  }
}, 500);

// 给评论点赞
const commentLike = async (item: any, isSong) => {
  if (!localStorage.getItem("cookie")) return ElMessage.warning("请先登录！");
  if (isSong) {
    // 是否为歌曲
    params.type = 0;
    params.id = id.value;
  }
  const likeParms = {
    t: 1,
    type: params.type,
    id: params.id,
    cid: 0,
  };
  likeParms.cid = item.commentId;
  likeParms.t = item.liked ? 0 : 1;
  const res = await getCommentLike(likeParms);
  setTimeout(() => {
    params.type === 0
      ? getSongComment({ id: id.value, type: 0 })
      : getComment({ id: params.id, type: params.type });
  }, 500);
};

</script>

<style lang="scss" scoped>
ul.list {
  li {
    .item-content {
      width: 100%;
      display: flex;
      .img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 30px;
      }

      .item {
        flex: 1;
        .name {
          font-weight: bold;
        }
        p {
          margin-bottom: 10px;
          .name {
            color: #0c73c2;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .reply {
          border-radius: 5px;
          background-color: #ddd;
          box-sizing: border-box;
          padding: 10px 20px;
          margin: 10px 0;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          .zan {
            display: flex;
            .mg {
              margin: 0 10px;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
            .like {
              color: red;
            }
          }
        }
      }
    }
  }
}
</style>
