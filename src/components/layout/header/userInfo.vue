<template>
  <div class="login">
    {{userInfo}}
    <ElAvatar size="default" round :src="profile?.avatarUrl ?? ''"></ElAvatar>

    <el-dropdown v-if="isLogin">
      <span class="el-dropdown-link">
        <span class="user">{{ profile.nickname }}</span>
        <!-- <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon> -->
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-link v-else class="user" type="primary" @click="showLogin = true"
      >请登录</el-link
    >
  </div>

  <el-dialog v-model="showLogin" title="登录" width="40%">
    <el-tabs
      tab-position="left"
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="手机号" name="phone">
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
          <!-- <el-form-item v-else label="验证码">
            <el-input
              v-model="formLabelAlign.captcha"
              placeholder="请输入验证码"
            >
              <template #append>
                <span v-if="isShow" @click="sendCode">发送</span>
                <span v-else>{{ time }}秒</span>
              </template>
            </el-input>
          </el-form-item> -->
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="邮箱" name="email">
        <el-form :model="formEmail" label-position="left" label-width="60px">
          <el-form-item label="邮箱">
            <el-input
              v-model="formEmail.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formEmail.password" placeholder="请输入密码">
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="二维码" name="loginImg">loginImg</el-tab-pane>
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
import { useLoginEmail, useLoginStatus } from "@/api/login";
import { storeToRefs } from "pinia";

const activeName = ref("phone");
// const dialogVisible = ref(false);
const iSpassword = ref(true);

const formLabelAlign = reactive({
  email: undefined,
  password: undefined,
});
const formEmail = reactive({
  email: "ln980908@163.com",
  password: "0123Lining",
});

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const { login } = useUserStore();
const { isLogin, profile, showLogin } = storeToRefs(useUserStore());
// profile =  localStorage.getItem("USER-PROFILE")
const handleLogin = async () => {
  login(formEmail.email, formEmail.password);
};

onMounted(()=>{
    const userInfo = localStorage.getItem("USER");
})
</script>

<style lang="scss" scoped>
.login {
  font-size: 14px;
  display: flex;
  align-items: center;
  .user {
    margin-left: 10px;
  }
}
</style>
