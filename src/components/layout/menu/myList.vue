<template>
  <div class="module-menu" v-if="isLogin">
    <div class="menus-title">我的音乐</div>
    <div class="menus-item">
      <router-link :to="{ name: 'myCollect' }">我的收藏</router-link>
    </div>
    <div class="menus-item">
      <router-link :to="{ name: 'recent' }">最近播放</router-link>
    </div>
    <el-collapse class="collapse" v-model="activeNames">
      <el-collapse-item title="创建的歌单" name="myPlayLists">
        <List :playlist="playlist" :subscribed="false" />
      </el-collapse-item>
      <el-collapse-item title="收藏的歌单" name="collectLists">
        <List :playlist="playlist" :subscribed="true" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserPlaylist } from "@/api/api";
import { IUserPlaylist } from "@/models/userPlaylist";

import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user";
import List from "./List.vue";

const route = useRoute();
const router = useRouter();
const activeNames = ref(["myPlayLists"]);

const { isLogin, playlist } = storeToRefs(useUserStore());

const userId = JSON.parse(localStorage.getItem("USER"))?.userId || "";

onMounted(async () => {
  playlist.value = await getUserPlaylist(userId);
});
</script>

<style lang="scss" scoped>
.collapse {
  box-sizing: border-box;
  :deep(.el-collapse-item__header),
  :deep(.el-collapse-item__wrap) {
    background-color: #f9fafb;
  }
}
</style>
