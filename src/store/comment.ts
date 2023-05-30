import { defineStore } from "pinia";
import { getAllComment,getCommentHot, getCommentNew, comment } from "@/api/comment";
import { ElMessage } from "element-plus";

export const useCommentStore = defineStore("comment", {
  state: () => {
    return {
      loadingHot: false,
      loadingNew: false,
      loadingSongHot: false,
      loadingSongNew: false,
      hotComents: [], // 热门评论
      newComents: [], // 最新评论
      hotSongComents: [], // 歌曲热门评论
      newSongComents: [], // 歌曲最新评论
      hotCommentIds: [],
      hotSongCommentIds: [],
    };
  },
  actions: {
    // 获取评论歌曲
    async getSongComment(params: any) {
      this.commentSongHot(params);
      this.commentSongNew(params);
    },
    async commentSongHot(params: any) {
      this.loadingSongHot = true;
      const { hotComments } = await getCommentHot(params);
      this.hotSongComents = hotComments;
      this.loadingSongHot = false;
      hotComments.forEach((item) => {
        this.hotSongCommentIds.push(item.commentId);
      });
    },
    async commentSongNew(params: any) {
      this.loadingSongNew = true;
      const { data } = await getCommentNew(params);
      this.newSongComents = data.comments;
      this.loadingSongNew = false;
    },

    // 获取评论其他 歌单/专辑/视频/mv
    async getComment(params: any) {
      this.commentHot(params);
      this.commentNew(params);
    },
    async commentHot(params: any) {
      this.loadingHot = true;
      const { hotComments } = await getCommentHot(params);
      this.hotComents = hotComments;
      this.loadingHot = false;
      hotComments.forEach((item) => {
        this.hotCommentIds.push(item.commentId);
      });
    },
    async commentNew(params: any) {
      this.loadingNew = true;
      const { data } = await getCommentNew(params);
      this.newComents = data.comments;
      this.loadingNew = false;
    },
  },
});
