<template>
  <div class="playInfo">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="info">
          <el-skeleton-item
            variant="image"
            style="
              width: 196px;
              height: 176px;
              border-radius: 15px;
              margin-right: 20px;
            "
          />
          <div class="detail">
            <!-- <el-skeleton-item variant="text" style="width: 200px" /> -->
            <el-skeleton :rows="5" />
          </div>
        </div>
      </template>
      <template #default>
        <div class="info">
          <img :src="playlist.coverImgUrl" alt="" />
          <div class="detail">
            <h1>
              <el-tag class="ml-2" type="success">歌单</el-tag>
              <span class="name">{{ playlist.name }}</span>
            </h1>
            <div class="creator">
              <el-avatar :src="playlist.creator.avatarUrl" size="small" round />
              <span class="name">{{ playlist.creator.nickname }}</span>
              <div class="time">{{ formatDate(playlist.createTime) }}</div>
            </div>

            <div class="button">
              <el-button type="success" @click="playAll">
                <IconPark :icon="PlayOne" size="18" />
                <span>播放全部</span>
              </el-button>
            </div>
            <div style="padding-left: 20px">
              <div class="tags">
                标签：
                <span v-if="playlist.tags.length">
                  <span class="tags-item" v-for="item in playlist.tags" :key="item.id">{{ item }}</span>
                </span>
                <span v-else>暂无标签</span>
              </div>
              <div>
                <span>歌曲：{{ playlist.trackCount }}</span
                >&nbsp;&nbsp;
                <span>播放：{{ playlist.playCount }}次</span>
              </div>
              <!-- 详情 -->
              <div class="description">
                <el-collapse class="collapse" v-if="playlist.description">
                  <el-collapse-item title="查看歌单详情">
                    <p>{{ playlist.description }}</p>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import MoreText from "@/components/common/moreText.vue";
import IconPark from "@/components/common/IconPark.vue";
import { PlayOne } from "@icon-park/vue-next";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/store/player";
import { formatDate, useNumberFormat } from "@/utils/format";

const { playList } = storeToRefs(usePlayerStore());
defineProps<{
  loading: boolean;
  playlist;
  playAll?: () => void;
}>();
</script>

<style lang="scss" scoped>
.playInfo {
  min-height: 200px;
  .info {
    display: flex;
    font-size: 12px;
    padding-bottom: 20px;
    & > img {
      width: 176px;
      height: 176px;
      border-radius: 15px;
      margin-right: 20px;
    }
    .detail {
      width: 100%;
      h1 {
        font-size: 24px;
        color: #334155;
        display: flex;
        align-items: center;
        .name {
          margin-left: 10px;
        }
      }
      .creator {
        color: #94a3b8;
        display: flex;
        align-items: center;
        .name {
          color: #6191c2;
          margin: 0 10px 0 5px;
        }
      }
      .tags {
        margin: 5px 0;
        span {
          margin: 0 3px;
        }
        .tags-item::before {
          content: "#";
        }
        span:hover {
          text-decoration: underline;
          cursor: pointer;
          color: #34d399;
        }
      }
      .button {
        margin: 10px 0;
      }
      .description {
        margin-top: 5px;
        color: #6b7280;
      }
    }
  }
}
</style>
