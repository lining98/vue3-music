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
  <div class="module-menu" v-if="isLogin">
    <div class="menus-title">我的音乐</div>

    <el-collapse class="collapse"
      ><!-- v-model="activeNames" -->
      <el-collapse-item title="我的歌单" name="like">
        <ul class="list">
          <li v-for="item in playlist" :key="item.id">
            <img :src="item.coverImgUrl" alt="" />
            <div>
              <p class="name">{{ item.name }}</p>
              <span>{{ item.trackCount }}首</span>
            </div>
          </li>
        </ul>
      </el-collapse-item>
      <!-- <el-collapse-item title="创建的歌单" name="like">
        <ul class="list">
          <li v-for="item in playlist" :key="item.id">
            <div v-if="item.subscribed">
              <img :src="item.coverImgUrl" alt="" />
              <div>
              {{item.subscribed}}
                <p class="name">{{ item.name }}</p>
                <span>{{ item.trackCount }}首</span>
              </div>
            </div>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="收藏的歌单" name="collect">
        <ul class="list">
        </ul>
      </el-collapse-item> -->
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import IconPark from "@/components/common/iconPark.vue"; //引入公共组件
import { ref, toRefs, onMounted, reactive } from "vue";
import { useMenu } from "./useMenu";
import { getUserPlaylist } from "@/api/api";
import { IUserPlaylist } from "@/models/userPlaylist";

import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user";

const activeNames = ref(["like"]);
const { menus } = useMenu();

// const playlist = ref<IUserPlaylist[]>([]);

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
  .list {
    li {
      height: 54px;
      display: flex;
      align-items: center;
      padding-left: 8px;
      cursor: pointer;
      img {
        width: 40px;
        margin-right: 3px;
      }
      div {
        width: 100%;
        display: flex;
        flex-direction: column;
        p.name {
          width: 135px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    li:hover {
      background:#f4f2f2;
    }
  }
}
</style>
