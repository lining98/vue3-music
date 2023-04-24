<template>
  <el-drawer v-model="showPlayList" :with-header="false" size="320px">
    <div class="drawer">
      <div class="header">
        <div class="title">播放列表</div>
        <div class="count">
          <span>共 {{ playListCount }} 首音乐</span>
          <span class="icon" @click="clearPlayList"> <IconPark :icon="Delete" />清空 </span>
        </div>
      </div>

      <div class="song-list">
        <el-scrollbar>
          <ul>
            <li
              v-for="item in playList"
              :key="item.id"
              :class="item.id == id ? 'active' : ''"
              @dblclick="play(item.id)"
            >
              <div class="left">
                <div class="img">
                  <el-image lazy :src="item.al?.picUrl"></el-image>
                </div>
                <div class="name">
                  <p>{{ item?.name }}</p>
                  <p>
                    <span v-for="(author, index) in item.ar" :key="author.id">
                      <span>{{ author.name }}</span>
                      <span v-if="index != item.ar.length - 1">/</span>
                    </span>
                  </p>
                </div>
              </div>
              <div class="right">{{ useFormatDuring(item.dt) }}</div>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/store/player";
import IconPark from "@/components/common/iconPark.vue";
import { Delete } from "@icon-park/vue-next";
import { useFormatDuring } from "@/utils/numbers";

const { showPlayList, playListCount, playList, id } = storeToRefs(
  usePlayerStore()
);
const { play, clearPlayList } = usePlayerStore();
</script>

<style lang="scss" scoped>
.drawer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .header {
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 10px;
    .title {
      font-size: 22px;
    }
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
  .song-list {
    flex: 1;
    overflow: hidden;
    li {
      height: 50px;
      font-size: 12px;
      padding: 0 12px 0 9px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      border-left: 3px solid transparent;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      .left {
        flex: 1;
        display: flex;
        .img {
          // flex-shrink: 0;
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        .name {
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        p {
          width: 215px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .right {
        flex: 0;
      }
    }
    li:hover {
      background-color: #f5f7fa;
    }
    li.active {
      color: #34d399;
      border-left: 3px solid #34d399;
    }
  }
}
</style>
