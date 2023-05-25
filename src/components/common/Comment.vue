<template>
  <!-- 封装评论组件 -->
  <div class="comment">
    <!-- 评论区 -->
    <div class="submitComment">
      <el-input
        v-model="comments"
        type="textarea"
        show-word-limit
        maxlength="140"
        placeholder="留下你的评论"
      ></el-input>
      <el-button type="primary" @click="sendComment">评论</el-button>
    </div>
    <div v-loading="loading">
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
                  <span
                    ><IconPark :icon="ThumbsUp" />{{ item.likedCount }}</span
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
          <div class="item-content">
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
                  <span
                    ><IconPark :icon="ThumbsUp" />{{ item.likedCount }}</span
                  >
                  <span><IconPark :icon="Comment" /></span>
                </div>
              </div>
            </div>
          </div>
          <el-divider />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import IconPark from "@/components/common/IconPark.vue";
import { ThumbsUp, Comment } from "@icon-park/vue-next";
import { storeToRefs } from "pinia";
import { useCommentStore } from "@/store/comment";

const { hotComents, newComents, loading } = defineProps([
  "hotComents",
  "newComents",
  "loading",
]);

const { comments } = storeToRefs(useCommentStore());
const { sendComment, getComment } = useCommentStore();
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
            .zan span {
              margin: 0 3px;
            }
          }
        }
      }
    }
  }
}
</style>
