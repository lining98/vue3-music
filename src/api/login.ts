import axios from "@/utils/request";
import { IUserProfile } from "@/models/user";

/* 登录 */
// 手机号密码登录
// export async function useLogin() {
//     const { banners } = await axios.get<{ banners: IBanner }>("/banner", {
//       type: 0,
//     });
//     return banners;
//   }

// 邮箱密码登录
export async function useLoginEmail(email: string, password: string) {
  const data = await axios.get<{ data: IUserProfile }>("/login", {
    email: email,
    password: password,
  });
  return data;
}

// 登录状态
export async function useLoginStatus() {
  const data = await axios.get<{ data: IUserProfile }>("/login/status");
  return data;
}

// 退出登录 getLogout
export async function getLogout() {
  return await axios.get("/logout");
}
