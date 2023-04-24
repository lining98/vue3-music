<template>
  <div class="header">
    <div class="back">
      <el-button :icon="ArrowLeft" circle @click="router.back()" />
      <el-button :icon="ArrowRight" circle @click="router.forward()" />
    </div>
    <div class="search">
      <div >
        <SearchPop />
      </div>
      <div>
        <UserInfo />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import SearchPop from "./searchPop.vue";
import UserInfo from "./userInfo.vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";
import {useRouter} from 'vue-router'
const router = useRouter()

const iconSize = ref(30);
const { showSearchView, searchKeyword } = storeToRefs(useSearchStore());
</script>

<style lang="scss" scoped>
.header {
  // border-bottom: 1px solid #000;
  width: 100%;
  height: 56px;
  box-sizing: border-box;
  position: relative;
  padding: 0 20px 0 100px;
  .back{
    position: absolute;
    left: 10px;
    top: 10px;
    // transform: translateY(-40%);
  }
  .search {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
