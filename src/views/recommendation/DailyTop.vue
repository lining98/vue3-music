<template>
  <div class="daily-top">
    <div class="calender">
      <IconPark :icon="Calendar" :size="80" />
      <span class="date">{{ new Date().getDate() }}</span>
    </div>
    <div class="descript">
      <p>每日推荐</p>
      <p>根据你的音乐口味生成，每天6:00刷新</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Calendar } from "@icon-park/vue-next";
import Iconpark from "@/components/common/IconPark.vue";

const msg = ref("");
</script>

<style lang="scss" scoped>
.daily-top {
  display: flex;
  margin-bottom: 20px;
  .calender {
    position: relative;
    margin-right: 10px;
    .i-icon {
      cursor: default;
    }
    .date {
      font-size: 21px;
      padding: 0 8px;
      position: absolute;
      left: 50%;
      top: 34.5px;
      transform: translateX(-50%);
      background-color: #fff;
    }
  }
  .descript {
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0 20px;
    p:nth-child(1) {
      font-weight: bold;
    }
    p:nth-child(2) {
      font-size: 14px;
    }
  }
}
</style>
