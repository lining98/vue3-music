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
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-link v-else class="user" type="primary" @click="showLogin = true"
      >请登录</el-link
    >
  </div>

  <el-dialog
    v-model="showLogin"
    title="登录"
    width="500"
    :before-close="handleClose"
  >
    <el-tabs
      tab-position="left"
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="邮箱" name="email">
        <el-form :model="formEmail" label-position="left" label-width="60px">
          <el-form-item label="邮箱">
            <el-input v-model="formEmail.email" placeholder="请输入邮箱">
              <template #append>@163.com</template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="formEmail.password"
              type="password"
              show-password
              placeholder="请输入密码"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="二维码" name="loginImg" class="loginImg">
        <h3>{{ account.message }}</h3>
        <div v-if="!account.avatarUrl">
          <img :src="qrimg" alt="" />
        </div>
        <div v-else>
          <img :src="account.avatarUrl" alt="" />
          <p>{{ account.nickname }}</p>
        </div>
      </el-tab-pane>
    </el-tabs>
    <template v-if="activeName == 'email'" #footer>
      <span class="dialog-footer">
        <el-button @click="showLogin = false">取消</el-button>
        <el-button type="primary" @click="handleLogin"> 登录 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import type { TabsPaneContext } from "element-plus";
import { useUserStore } from "@/store/user";
import { useLoginEmail, getLogout } from "@/api/login";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { getKey, qrCreate, qrCheck, loginStatus } from "@/api/login";
const router = useRouter();

const { login } = useUserStore();
const { isLogin, profile, showLogin } = storeToRefs(useUserStore());
const { getPlaylist } = useUserStore();
const handleLogin = async () => {
  // ElMessage.error("现在要求验证,请使用二维码登录");
  login(formEmail.email, formEmail.password);
};

const activeName = ref("email");
const iSpassword = ref(true);

const qrimg = ref("");

const formEmail = reactive({
  email: "",
  password: "",
});
let timer;

const checkStatus = async (key) => {
  return await qrCheck(key);
};
const getLoginStatus = async (cookie = "") => {
  const { data } = await loginStatus({ cookie: cookie });
  localStorage.setItem("USER", JSON.stringify(data.profile));
  profile.value = data.profile;
  getPlaylist(data.profile?.userId)
};

const account = reactive({
  message: "",
  nickname: "",
  avatarUrl: "",
});

const handleClick = async (tab: TabsPaneContext) => {
  if (tab.paneName === "loginImg") {
    const cookie = localStorage.getItem("cookie");
    getLoginStatus(cookie);
    const { code, unikey } = await getKey();
    const res = await qrCreate(unikey);
    qrimg.value = res.qrimg;

    timer = setInterval(async () => {
      const statusRes = await checkStatus(unikey);
      // console.log(statusRes);
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
        ElMessage.success("授权登录成功");
        clearInterval(timer);
        showLogin.value = false;
      }
    }, 3000);
  } else {
    clearInterval(timer);
  }
};

const handleClose = (done: () => void) => {
  clearInterval(timer);
  showLogin.value = false
};

async function logout() {
  const res = await getLogout();
  if (res.code === 200) {
    ElMessage.success("已退出登录");
    localStorage.clear();
    router.go(0);
  }
}

function getUser() {
  const details = JSON.parse(localStorage.getItem("USER"));
  profile.value = details
  getPlaylist(details?.userId)
}

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
    width: 200px;
  }
}
</style>
