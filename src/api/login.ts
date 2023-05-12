import axios from "@/http/request";
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
export async function loginStatus(data) {
  return await axios.post("/login/status",data);
}

// 退出登录 getLogout
export async function getLogout() {
  return await axios.get("/logout");
}


// 二维码登录
// 1. 二维码 key 生成接口
export async function getKey() {
  const {data} = await axios.get("/login/qr/key");
  return data
}
// 2. 二维码生成接口
export async function qrCreate(key) {
  const {data} = await axios.get(`/login/qr/create?qrimg=true&key=${key}`);
  return data
}
// 3. 二维码检测扫码状态接口
export async function qrCheck(key) {
  return await axios.get(`/login/qr/check?key=${key}`);
}
