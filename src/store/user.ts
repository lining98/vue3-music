import { defineStore } from "pinia";
import type { UserProfile } from "@/models/user";
import { useLoginEmail, useLoginStatus } from "@/api/login";
import { ElMessage } from "element-plus";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: "",
      cookie: "",
      showLogin: false,
      profile: {} as UserProfile,
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
      console.log(res);
      if (res.code == 200) {
        console.log(1);

        ElMessage.success("登录成功!");
        this.token = res.token;
        this.cookie = res.cookie;
        document.cookie = res.cookie;
        console.log("res.profile", res.profile);
        this.profile = res.profile;

        const userInfo = {
          avatarUrl: this.profile.avatarUrl,
          nickname: this.profile.nickname,
          userId: this.profile.userId,
          userType: this.profile.userType,
        };
        localStorage.setItem("USER-TOKEN", this.token);
        localStorage.setItem("USER-COOKIE", this.cookie);
        localStorage.setItem("USER", JSON.stringify(userInfo));
        // this.checkLogin()

        this.showLogin = false;
      } else {
        console.log(2);

        ElMessage.error(res.message);
      }
    },
    // async checkLogin(){
    //     const {data} = await useLoginStatus()
    //     if(data.code === 200){
    //         this.profile = data.profile
    //         this.showLogin = false
    //     }
    // }
  },
});
