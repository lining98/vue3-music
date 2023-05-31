import { defineStore } from "pinia";
import type { UserProfile } from "@/models/user";
import { IUserPlaylist } from "@/models/userPlaylist";
import { useLoginEmail, loginStatus } from "@/api/login";
import { getLikelist, getUserPlaylist, likeSong } from "@/api/api";
import { ElMessage } from "element-plus";
import { Like } from "@icon-park/vue-next";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userId: 0,
      likes: [],
      token: "",
      cookie: "",
      showLogin: false,
      profile: {},
      playlist: {} as IUserPlaylist,
    };
  },
  getters: {
    isLogin: (state) => {
      return state.profile?.userId > 0;
    },
  },
  actions: {
    // 邮箱登录
    // async login(email: string, password: string) {
    //   const res = await useLoginEmail(email, password);
    //   if (res.code == 200) {
    //     ElMessage.success("登录成功!");
    //     this.token = res.token;
    //     this.cookie = res.cookie;
    //     document.cookie = res.cookie;
    //     this.profile = res.profile;

    //     localStorage.setItem("token", this.token);
    //     localStorage.setItem("cookie", this.cookie);
    //     localStorage.setItem("USER", JSON.stringify(this.profile));
    //     this.getPlaylist(this.profile.userId);

    //     // this.checkLogin()
    //     this.showLogin = false;
    //   } else {
    //     ElMessage.error(res.message);
    //   }
    // },
    // 获取我的歌单
    async getPlaylist(userId: number) {
      this.playlist = await getUserPlaylist(userId);
    },

    // 获取喜欢音乐列表
    async getLikeList(userId: number) {
      const { ids } = await getLikelist(userId);
      this.likes = ids;
    },

    // 喜欢音乐
    async Like(id: number) {
      let isLike = this.likes.indexOf(id) == -1;
      let msg = isLike ? "喜欢歌曲" : "取消喜欢";
      const res = await likeSong(id, isLike);
      if (res.code === 200) {
        ElMessage.success(msg);
        this.getLikeList(this.userId);
      } else if (res.code === 405) {
        ElMessage.error(res.message);
      } else {
        ElMessage.error(res.message);
      }
    },
  },
});
