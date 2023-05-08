<template>
  <div v-loading="loading">
    <div class="scount">共搜到<span>{{ dataList.playlistCount }}</span>个歌单
    </div>
    <ul class="sPlayList">
      <li v-for="item in dataList.playlists" :key="item.id">
        <div class="play"><IconPark :icon="Play" size="16" class="like" /></div>
        <div class="image">
          <el-image :src="item.coverImgUrl"></el-image>
        </div>
        <div class="name">{{item.name}}</div>
        <div class="count">{{item.trackCount}} by {{item.creator.nickname}}</div>
        <div class="collect">收藏：{{item.bookCount}}</div>
        <div class="listenTo">收听：{{item.playCount}}</div>
      </li>
    </ul>
    <CPagination
      v-if="dataList.playlistCount > 30"
      :count="dataList.playlistCount"
      @sizeChange="handleChangePage"
      @currentChange="handleChangeCurrent"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import CPagination from "@/components/common/CPagination.vue";
import IconPark from '@/components/common/iconPark.vue'
import {Play} from '@icon-park/vue-next'

const route = useRoute();
const type = route.query.type;
import useSearchPage from "./searchPage";
const { info, loading, dataList, getData } = useSearchPage();

const handleChangePage = (val: any) => {
  info.limit = val;
  getData(info.offset, info.limit, type);
};
const handleChangeCurrent = (val: any) => {
  info.offset = info.limit * (val - 1);
  getData(info.offset, info.limit, type);
};

watch(
  () => route.fullPath,
  () => {
    if (Number(route.query.type) == 1000) {
      getData(0, 30, 1000);
    }
  }
);
onMounted(() => {
  getData(0, 30, 1000);
});
</script>

<style lang="scss" scoped>
.sPlayList{
  li{
    padding: 5px 0;
    display: flex;
    align-items: center;
    border: 1px solid transparent;
    >div{
      margin: 0 10px;
    }
    .play{
      width: 30px;
      height: 50px;
    }
    .image{
      width: 50px;
      height: 50px;
      border: 1px solid #d9d9d9;
    }
    .name{
      flex: 1;
    }
    .count{
      width: 350px;
    }
    .collect{
      width: 120px;
    }
    .listenTo{
      width: 120px;
    }
  }
  li:nth-child(2n){
    background-color: #f7f7f7;
  }
  li:hover{
    border: 1px solid #e1e1e1;
    background-color: #f2f2f2;
  }
}
</style>
