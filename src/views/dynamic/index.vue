<template>
  <div class="dynamic">
    <h2>{{ msg }}</h2>
    <div class="item" v-for="item in eventList" :key="item.id">
      <div class="item-content">
        <img class="avatarUrl" :src="item.user.avatarUrl" alt="" />
        <div class="right">
          <div class="title">{{ item.user.nickname }}</div>
          <div class="time">{{formatDate(item.showTime,true)}}</div>
          <p>{{JSON.parse(item.json).msg}}</p>
          <div class="imgs">
            <img v-if="item.pics" v-for="(img,i) in item.pics" :key="i" :src="img.originUrl" alt="">
          </div>
          <p>{{item.info.commentThread.resourceOwnerId}}========{{item.info.commentThread.resourceTitle}}</p>
        </div>
      </div>
      <el-divider />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { getEvent } from "@/api/dynamic";
import {formatDate} from '@/utils/format'

const msg = ref("动态");
const loading = ref(false);
const pagesize = ref(20);
const lastTime = ref(-1);
const eventList = ref([]);

const getData = async () => {
  loading.value = true;
  const { event, lasttime } = await getEvent(pagesize.value, lastTime.value);
  eventList.value = event;
  lastTime.value = lasttime;
  loading.value = false;
};

onMounted(getData);
</script>

<style lang="scss" scoped>
.dynamic {
  h2 {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #34d399;
  }
  .item {
    .item-content {
        display: flex;
      .avatarUrl {
        width: 45px;
        height: 45px;
        margin-right: 10px;
      }
      .time{
        font-size: 12px;
        color: #333;
        margin:8px 0 15px;
      }
      .imgs{
        img{
            max-width: 220px;
            margin-right: 5px;
        }
      }
    }
  }
}
</style>
