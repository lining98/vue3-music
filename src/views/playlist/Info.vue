<template>
  <!-- <div>{{playlist?.name}}</div> -->
  <div v-if="playlist" class="info">
    <img :src="playlist.coverImgUrl" alt="" />
    <div id="detail">
      <h1>{{ playlist.name }}</h1>
      <div class="creator">
        <el-avatar :src="playlist.creator.avatarUrl" size="small" round />
        <span class="name">{{ playlist.creator.nickname }}</span>
        <div class="tags">
          <span v-for="item in playlist.tags" :key="item.id">{{ item }}</span>
        </div>
      </div>
      <p class="description">
        <MoreText v-if="playlist.description"  :text="playlist.description" :end="90" />
      </p>
      <div>
        <el-button type="success">
          <IconPark :icon="PlayOne" size="18" />
          <span>播放全部</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MoreText from "@/components/common/moreText.vue";
import IconPark from "@/components/common/iconPark.vue";
import { PlayOne } from "@icon-park/vue-next";

const msg = ref("info");
defineProps(["playlist"]);
</script>

<style lang="scss" scoped>
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
  #detail {
    h1 {
      font-size: 24px;
      color: #334155;
    }
    .creator {
      color: #94a3b8;
      display: flex;
      align-items: center;
      .name {
        color: red;
        margin: 0 10px 0 5px;
      }
      .tags {
        span {
          margin: 0 3px;
        }
        span::before {
          content: "#";
        }
        span:hover {
          text-decoration: underline;
          cursor: pointer;
          color: #34d399;
        }
      }
    }
    .description {
      color: #6b7280;
      margin: 10px 0 30px;
    }
  }
}
</style>
