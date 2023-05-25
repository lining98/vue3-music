import { defineStore } from "pinia";
import { getCommentHot, getCommentNew, comment } from "@/api/comment";

export const useCommentStore = defineStore("comment", {
  state: () => {
    return {
      comments: "", // 评论内容
      loading: false,
      hotComents: [], // 热门评论
      newComents: [], // 最新评论
    };
  },
  actions: {
    async getComment(params: any) {
      this.loading = true;
      const { data } = await getCommentNew(params);
      const { hotComments } = await getCommentHot(params);
      this.newComents = data.comments;
      this.hotComents = hotComments;
      this.loading = false;
    },

    // 发送评论
    sendComment() {
      console.log(this.comments);
    },
  },
});
