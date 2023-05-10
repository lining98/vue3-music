import { defineStore } from "pinia";
import type { UserProfile } from "@/models/user";
import { IUserPlaylist } from "@/models/userPlaylist";
import { useLoginEmail, loginStatus } from "@/api/login";
import { getUserPlaylist } from "@/api/api";
import { ElMessage } from "element-plus";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: "",
      cookie: "",
      showLogin: false,
      // profile: {} as UserProfile,
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
        // console.log("res.profile", res.profile);
        this.profile = res.profile;

        // const userInfo = {
        //   avatarUrl: this.profile.avatarUrl,
        //   nickname: this.profile.nickname,
        //   userId: this.profile.userId,
        //   userType: this.profile.userType,
        // };
        localStorage.setItem("USER-TOKEN", this.token);
        localStorage.setItem("USER-COOKIE", this.cookie);
        localStorage.setItem("USER", JSON.stringify(this.profile));
        this.getPlaylist(this.profile.userId);

        // this.checkLogin()
        this.showLogin = false;
      } else {
        ElMessage.error(res.message);
      }
    },
    // async checkLogin(){
    //     const {data} = await loginStatus()
    //     if(data.code === 200){
    //         this.profile = data.profile
    //         this.showLogin = false
    //     }
    // }
    async getPlaylist(userId: number) {
      this.playlist = await getUserPlaylist(userId);
    },
  },
});
