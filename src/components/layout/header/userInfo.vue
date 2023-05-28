<template>
  <div class="login">
    <el-dropdown style="" v-if="isLogin">
      <span class="el-dropdown-link" @click="userLogin">
        <ElAvatar
          size="default"
          round
          :src="profile?.avatarUrl ?? ''"
        ></ElAvatar>

        <span class="user" style="margin-left: 5px; font-size: 15px">{{
          profile.nickname
        }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="quitDialogIsVisible = true"> 退出 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-link v-else class="user" type="primary" @click="showLoginModal"
      >请登录</el-link
    >
  </div>

<!-- 登录窗口 二维码 -->
  <el-dialog
    v-model="showLogin"
    title="登录"
    width="500"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div class="loginImg">
      <h3>{{ account.message }}</h3>
      <div v-if="!account.avatarUrl">
        <div v-loading="loading">
          <img :src="qrimg" title="点击刷新二维码" @click="changeImg" />
        </div>
      </div>
      <div v-else>
        <img :src="account.avatarUrl" alt="" />
        <p>{{ account.nickname }}</p>
      </div>
    </div>
  </el-dialog>

  <!-- 退出登录窗口 -->
    <el-dialog v-model="quitDialogIsVisible" title="退出登录" width="30%" :center="true" >
      <span class="quitHint">是否确认退出登录？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="logout">确定</el-button>
          <el-button @click="quitDialogIsVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import type { TabsPaneContext } from "element-plus";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import {
  useLoginEmail,
  getLogout,
  getKey,
  qrCreate,
  qrCheck,
  loginStatus,
} from "@/api/login";

import { getLikelist } from "@/api/api";
const router = useRouter();

const { login } = useUserStore();
const { isLogin, profile, showLogin } = storeToRefs(useUserStore());
const { getPlaylist } = useUserStore();
const iSpassword = ref(true);

const userId = ref();
const qrimg = ref("");
const quitDialogIsVisible = ref(false)
let timer: null;

const checkStatus = async (key) => {
  return await qrCheck(key);
};
const getLoginStatus = async (cookie = "") => {
  const { data } = await loginStatus({ cookie: cookie });
  localStorage.setItem("USER", JSON.stringify(data.profile));
  profile.value = data.profile;
  userId.value = data.profile?.userId;
};

const loading = ref(false);
const account = reactive({
  message: "等待扫码",
  nickname: "",
  avatarUrl: "",
});

const showLoginModal = () => {
  showLogin.value = true;
  handleLogin();
};

const changeImg = () => {
  handleLogin();
};

const handleLogin = async () => {
  loading.value = true;
  const cookie = localStorage.getItem("cookie");
  getLoginStatus(cookie);
  const { code, unikey } = await getKey();
  const res = await qrCreate(unikey);
  qrimg.value = res.qrimg;
  loading.value = false;

  timer = setInterval(async () => {
    const statusRes = await checkStatus(unikey);
    account.message = statusRes.message;
    if (statusRes.code === 800) {
      ElMessage.error("二维码已过期,请重新获取");
      clearInterval(timer);
    }
    if (statusRes.code === 802) {
      account.nickname = statusRes.nickname;
      account.avatarUrl = statusRes.avatarUrl;
    }
    if (statusRes.code === 803) {
      // 这一步会返回cookie
      await getLoginStatus(statusRes.cookie);
      localStorage.setItem("cookie", statusRes.cookie);
      getPlaylist(userId.value);

      const { ids } = await getLikelist(userId.value);
      localStorage.setItem("likes", ids);
      ElMessage.success("授权登录成功");
      clearInterval(timer);
      showLogin.value = false;
    }
  }, 3000);
};

const handleClose = (done: () => void) => {
  clearInterval(timer);
  showLogin.value = false;
};

const logout = async() => {
  const res = await getLogout();
  if (res.code === 200) {
    ElMessage.success("已退出登录");
    localStorage.clear();
    router.go(0);
  }
};

const getUser = () => {
  const details = JSON.parse(localStorage.getItem("USER"));
  profile.value = details;
  getPlaylist(details?.userId);
};

onMounted(() => {
  getUser();
});
</script>

<style lang="scss" scoped>
.login {
  font-size: 14px;
  display: flex;
  align-items: center;
  .el-dropdown-link {
    display: flex;
    align-items: center;
    outline: none;
  }
  .user {
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
.loginImg {
  height: 250px;
  text-align: center;
  img {
    width: 250px;
    cursor: pointer;
  }
}
</style>
