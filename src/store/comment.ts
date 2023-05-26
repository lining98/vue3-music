import { defineStore } from "pinia";
import { getCommentHot, getCommentNew } from "@/api/comment";

export const useCommentStore = defineStore("comment", {
  state: () => {
    return {
      loadingHot: false,
      loadingNew: false,
      hotComents: [], // 热门评论
      newComents: [], // 最新评论
      hotCommentIds:[]
    };
  },
  actions: {
    async getComment(params: any) {
      this.commentHot(params);
      this.commentNew(params);
    },
    async commentHot(params: any) {
      this.loadingHot = true;
      const { hotComments } = await getCommentHot(params);
      this.hotComents = hotComments;
      this.loadingHot = false;
      hotComments.forEach(item=>{
        this.hotCommentIds.push(item.commentId)
      })
    },
    async commentNew(params: any) {
      this.loadingNew = true;
      const { data } = await getCommentNew(params);
      this.newComents = data.comments;
      this.loadingNew = false;
    },
  },
});
