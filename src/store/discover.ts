import { defineStore } from "pinia";
import {
  getHotPlaylist,
} from "@/api/discover";

export const useDiscoverStore = defineStore("discover", {
  state: () => {
    return {
      cat: "全部歌单", // 歌单分类信息
      catlist:[], //歌单分类
      catlisthot:[], //热门歌单分类
    };
  },
  actions: {

  },
});
