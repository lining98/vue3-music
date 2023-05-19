import { defineStore } from "pinia";
import { getVideoGroupById } from "@/api/video";
import { Loading } from "@icon-park/vue-next";
import { ElMessage } from "element-plus";

export const useVideoStore = defineStore("video", {
  state: () => {
    return {
      cat: "现场", // 视频分类标签
      catId: 0,
      videos: [],
      time: 0,

      loading: true,
    };
  },
  actions: {
    handleClickSub(item: any) {
      this.loading = true;
      this.time = 0;
      this.videos = [];
      this.cat = item.name;
      this.catId = item.id;
      this.getMoreVideos();
    },

    // 获取视频列表
    async getMoreVideos() {
      let i = 3;
      while (i) {
        let offset = this.time * 8;
        const { datas, hasmore, msg } = await getVideoGroupById(
          this.catId,
          offset
        );
        if (hasmore) {
          this.videos.push(...datas);
          this.time++;
        } else {
          ElMessage.warning(msg);
        }
        i--;
      }

      this.loading = false;
    },
  },
});
