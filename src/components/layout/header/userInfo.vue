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

  <el-dialog v-model="showLogin" title="登录" width="30%">
    <el-tabs tab-position="left" v-model="activeName" class="demo-tabs">
      <!-- <el-tab-pane label="手机号" name="phone">
        <el-form
          :model="formLabelAlign"
          label-position="left"
          label-width="60px"
        >
          <el-form-item label="手机号">
            <el-input
              v-model="formLabelAlign.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="iSpassword" label="密码">
            <el-input
              v-model="formLabelAlign.password"
              placeholder="请输入密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item v-else label="验证码">
            <el-input
              v-model="formLabelAlign.captcha"
              placeholder="请输入验证码"
            >
              <template #append>
                <span v-if="isShow" @click="sendCode">发送</span>
                <span v-else>{{ time }}秒</span>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane> -->
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
      <!-- <el-tab-pane label="二维码" name="loginImg">loginImg</el-tab-pane> -->
    </el-tabs>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showLogin = false">取消</el-button>
        <el-button type="primary" @click="handleLogin"> 登录 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { TabsPaneContext } from "element-plus";
import { useUserStore } from "@/store/user";
import { useLoginEmail, getLogout } from "@/api/login";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const router = useRouter();

const activeName = ref("email");
const iSpassword = ref(true);

const formLabelAlign = reactive({
  email: undefined,
  password: undefined,
});
const formEmail = reactive({
  email: "",
  password: "",
});

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const { login } = useUserStore();
const { isLogin, profile, showLogin } = storeToRefs(useUserStore());
const handleLogin = async () => {
  login(formEmail.email, formEmail.password);
};

async function logout() {
  // router.push("/");
  const res = await getLogout();
  if (res.code === 200) {
    ElMessage.success("已退出登录");
    localStorage.clear();
    // router.push('/');
    // location.reload()
    router.go(0);
  }
}

function getUser() {
  profile.value = JSON.parse(localStorage.getItem("USER"));
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
  }
}
</style>
