<template>
  <el-skeleton :loading="loading" animated
    ><template #template>
      <ul class="list">
        <li v-for="item in 24" :key="item">
          <div class="img">
            <el-skeleton-item
              variant="image"
              style="width: 100%; height: 120px; margin-bottom: 10px"
            />
          </div>
          <el-skeleton-item variant="p" style="width: 150px" />
        </li>
      </ul>
    </template>
    <template #default>
      <ul class="list">
        <li v-for="item in props.videos" :key="item.id || item.data?.id">
          <div
            class="img"
            @click="router.push({ name: 'videosDetails', query: { id: isMv?item.data.id:item.data.vid } })"
          >
            <el-image :src="isMv?item.cover:item.data.coverUrl">
              <template #placeholder>
                <div class="image-slot">
                  Loading<span class="dot">...</span>
                </div>
              </template>
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
            <div class="count">
              <IconPark class="icon" :icon="VideoOne" size="18" />{{
                useNumberFormat(isMv?item.playCount:item.data.playTime)
              }}
            </div>
            <div class="time">{{ useFormatDuring(isMv?item.duration:item.data.durationms) }}</div>
          </div>
          <p>{{ isMv?item.name:item.data.title }}</p>
        </li>
      </ul>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Picture as IconPicture } from "@element-plus/icons-vue";
import { useVideoStore } from "@/store/video";
import { storeToRefs } from "pinia";
import { useFormatDuring, useNumberFormat } from "@/utils/format";
import IconPark from "@/components/common/iconPark.vue";
import { Play, VideoOne } from "@icon-park/vue-next";
import { useRouter } from "vue-router";

const router = useRouter();
const { cat, catId, videos } = storeToRefs(useVideoStore());

const props = defineProps(["videos","isMv",'loading']);
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  li {
    width: 25%;
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;
    .img {
      position: relative;
      font-size: 12px;
      color: #f5f5f5;
      .count {
        position: absolute;
        right: 5px;
        top: 0;
        span {
          margin-right: 5px;
          position: relative;
          top: 4px;
        }
      }
      .time {
        width: 100%;
        height: 20px;
        line-height: 20px;
        box-sizing: border-box;
        padding-left: 3px;
        position: absolute;
        left: 0;
        bottom: 3px;
        background-color: rgba($color: #000000, $alpha: 0.5);
      }
    }
    .el-image {
      width: 100%;
    }
  }
}
</style>
