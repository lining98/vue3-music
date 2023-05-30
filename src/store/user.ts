import { defineStore } from "pinia";
import type { UserProfile } from "@/models/user";
import { IUserPlaylist } from "@/models/userPlaylist";
import { useLoginEmail, loginStatus } from "@/api/login";
import { getLikelist } from "@/api/api";
import { getUserPlaylist } from "@/api/api";
import { ElMessage } from "element-plus";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      likes:[],
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
    async login(email: string, password: string) {
      const res = await useLoginEmail(email, password);
      if (res.code == 200) {
        ElMessage.success("登录成功!");
        this.token = res.token;
        this.cookie = res.cookie;
        document.cookie = res.cookie;
        this.profile = res.profile;

        localStorage.setItem("token", this.token);
        localStorage.setItem("cookie", this.cookie);
        localStorage.setItem("USER", JSON.stringify(this.profile));
        this.getPlaylist(this.profile.userId);

        // this.checkLogin()
        this.showLogin = false;
      } else {
        ElMessage.error(res.message);
      }
    },
    // 获取我的歌单
    async getPlaylist(userId: number) {
      this.playlist = await getUserPlaylist(userId);
    },

    // 获取喜欢音乐列表
    async getLikeList(userId:number){
      const { ids } = await getLikelist(userId);
      this.likes = ids
      // localStorage.setItem("likes", ids);
    }
  },
});
