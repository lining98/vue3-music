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
      <!-- 热门评论 -->
      <h2 v-if="hotComents.length">热门评论</h2>
      <ul class="list">
        <li v-for="item in hotComents" :key="item.commentId">
          <div class="item-content">
            <el-image lazy class="img" :src="item.user.avatarUrl" alt="" />
            <div class="item">
              <p>
                <span class="name">{{ item.user.nickname }} ：</span>
                <span>{{ item.content }}</span>
              </p>
              <!-- 回复 -->
              <div class="reply" v-if="item.beReplied.length">
                <div
                  v-for="ite in item.beReplied"
                  :key="ite.beRepliedCommentId"
                >
                  <span class="name">@{{ ite.user.nickname }} ：</span>
                  <p>{{ ite.content }}</p>
                </div>
              </div>
              <div class="bottom">
                <span class="time">{{ item.timeStr }}</span>
                <div class="zan">
                  <el-popconfirm
                    v-if="item.owner"
                    title="确定删除评论？"
                    @confirm="commentDel(item)"
                  >
                    <template #reference>
                      <el-button link class="del">删除</el-button>
                    </template>
                  </el-popconfirm>
                  <span
                    class="mg"
                    @click="commentLike(item.liked, item.commentId)"
                    ><IconPark
                      :class="item.liked ? 'like' : ''"
                      :icon="ThumbsUp"
                    />{{ item.likedCount }}</span
                  >
                  <span><IconPark :icon="Comment" /></span>
                </div>
              </div>
            </div>
          </div>
          <el-divider />
        </li>
      </ul>
      <!-- 最新评论 -->
      <h2 v-if="newComents.length">最新评论</h2>
      <ul class="list">
        <li v-for="item in newComents" :key="item.commentId">
          <div
            class="item-content"
            v-if="hotCommentIds.indexOf(item.commentId) == -1"
          >
            <el-image lazy class="img" :src="item.user.avatarUrl" alt="" />
            <div class="item">
              <p>
                <span class="name">{{ item.user.nickname }} ：</span>
                <span>{{ item.content }}</span>
              </p>
              <!-- 回复 -->
              <div class="reply" v-if="item.beReplied">
                <div
                  v-for="ite in item.beReplied"
                  :key="ite.beRepliedCommentId"
                >
                  <span class="name">@{{ ite.user.nickname }} ：</span>
                  <p>{{ ite.content }}</p>
                </div>
              </div>
              <div class="bottom">
                <span class="time">{{ item.timeStr }}</span>
                <div class="zan">
                  <el-popconfirm
                    v-if="item.owner"
                    title="确定删除评论？"
                    @confirm="commentDel(item)"
                  >
                    <template #reference>
                      <el-button link class="del">删除</el-button>
                    </template>
                  </el-popconfirm>
                  <span
                    class="mg"
                    @click="commentLike(item.liked, item.commentId)"
                    ><IconPark
                      :class="item.liked ? 'like' : ''"
                      :icon="ThumbsUp"
                    />{{ item.likedCount }}</span
                  >
                  <span><IconPark :icon="Comment" /></span>
                </div>
              </div>
            </div>
          </div>
          <el-divider v-if="hotCommentIds.indexOf(item.commentId) == -1" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import IconPark from "@/components/common/IconPark.vue";
import { ThumbsUp, Comment } from "@icon-park/vue-next";
import { useCommentStore } from "@/store/comment";
import { comment } from "@/api/comment";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { getCommentLike } from "@/api/comment";

const { loadingHot, loadingNew, hotCommentIds } = storeToRefs(
  useCommentStore()
);

const { getComment, commentNew } = useCommentStore();
const { id, type, hotComents, newComents,  } = defineProps([
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
const delParams = reactive({
  t: 0,
  type: type,
  id: id,
  threadId: "",
  commentId: 0,
});
const likeParms = reactive({
  t: 1,
  type: type,
  id: id,
  cid: 0,
});

// 发送评论
const sendComment = async () => {
  console.log(params);

  params.t = 1;
  const res = await comment(params);
  if (res.code === 200) {
    ElMessage.success("评论成功");
    commentNew({ id: id, type: type });
    params.content = "";
  } else {
    ElMessage.error(res.message);
  }
};

// 删除评论
const commentDel = async (item: any) => {
  delParams.threadId = item.threadId;
  delParams.commentId = item.commentId;
  const res = await comment(delParams);
  if (res.code === 200) {
    ElMessage.success("删除评论成功");
    commentNew({ id: id, type: type });
  }
};

// 给评论点赞
const commentLike = async (liked: boolean, commentId: number) => {
  likeParms.cid = commentId;
  likeParms.t = liked ? 0 : 1;
  const res = await getCommentLike(likeParms);
  getComment({ id: id, type: type });
};
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
}
</style>
