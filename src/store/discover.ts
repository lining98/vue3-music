import { defineStore } from "pinia";
import { getHotPlaylist, getArtistList } from "@/api/discover";

export const useDiscoverStore = defineStore("discover", {
  state: () => {
    return {
      cat: "全部歌单", // 歌单分类信息
      catlistDetail: {}, //歌单分类
      catlisthot: [], //热门歌单分类
      loading: false,
      changeCat:false, // 改变分类时条件
    };
  },
  actions: {
    async hotPlaylist(data?: any) {
      this.loading = true;
      this.catlistDetail = await getHotPlaylist(data);
      this.loading = this.catlistDetail.code !== 200;
      this.changeCat = true;
    },
    handleClickSub(item: any) {
      this.cat = item.name;
    },

    // 获取歌手分类列表
    async artistList(data?:any){
      await getArtistList(data)
    }
  },
});
