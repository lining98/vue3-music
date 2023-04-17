<template>
  <div class="module-menu" v-for="(item, i) in menus" :key="i">
    <div class="menus-title">{{ item.name }}</div>
    <div class="menus-item" v-for="menu in item.menus" :key="menu.key">
      <router-link :to="{ name: menu.key }">
        <IconPark :icon="menu.icon" size="18" />
        <span>{{ menu.name }}</span>
      </router-link>
    </div>
  </div>
  <div class="module-menu">
    <div class="menus-title">我的音乐</div>

    <el-collapse class="collapse" v-model="activeNames">
      <el-collapse-item title="创建的歌单" name="like">
        <ul class="list">
          <li>
            <img src="" alt="" />
            <div>
              <span>我喜欢的音乐</span>
              <span>131首</span>
            </div>
          </li>
          <li v-for="item in playlist" :key="item.id">
            <img :src="item.coverImgUrl" alt="" />
            <div>
              <span>{{ item.name }}</span>
              <span>{{ item.trackCount }}首</span>
            </div>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="收藏的歌单" name="collect">
        <ul class="list">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useMenu } from "./useMenu";
import { getUserPlaylist } from "@/api/api";
import { IUserPlaylist } from "@/models/userPlaylist";

import IconPark from "@/components/common/iconPark.vue"; //引入公共组件

const activeNames = ref(["like"]);
const { menus } = useMenu();

const playlist = ref<IUserPlaylist[]>([]);
const userId = JSON.parse(localStorage.getItem("USER")).userId;
onMounted(async () => {
  playlist.value = await getUserPlaylist(userId);
});
</script>

<style lang="scss" scoped>
.collapse {
  padding-left: 20px;
  :deep(.el-collapse-item__header),
  :deep(.el-collapse-item__wrap) {
    background-color: #f9fafb;
  }
  .list {
    li {
      height: 54px;
      display: flex;
      align-items: center;
      img {
        width: 40px;
      }
      div {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
