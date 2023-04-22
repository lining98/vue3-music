<template>
  <el-drawer
    class="drawer"
    v-model="showPlayList"
    :with-header="false"
    size="320px"
  >
  <div class="header">

    <div class="title">播放列表</div>
    <div class="count">
      <span>共 {{ playListCount }} 首音乐</span>
      <span class="icon"> <IconPark :icon="Delete" />清空 </span>
    </div>
  </div>
  <div class="songs">
    <ul>
        <li v-for="item in playList" :key="item.id">
            <img :src="item.al?.picUrl" alt="" width="40">
            {{item.name}}
        </li>
    </ul>
  </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/store/player";
import IconPark from "@/components/common/iconPark.vue";
import { Delete } from "@icon-park/vue-next";

const { showPlayList, playListCount, playList, id } = storeToRefs(
  usePlayerStore()
);
const { play, clearPlayList } = usePlayerStore();
</script>

<style lang="scss" scoped>
.drawer {
  .count {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-right: 10px;
  }
  .icon {
    font-size: 14px;
    .i-icon {
      position: relative;
      top: 2px;
    }
  }
  .icon:hover {
    cursor: pointer;
    color: #39c6ad;
  }
}
</style>
