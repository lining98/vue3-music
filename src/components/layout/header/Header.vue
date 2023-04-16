<template>
  <div class="header">
    <div class="back">
      <IconPark
        :icon="Left"
        :size="iconSize"
        :stroke-width="2"
        class="icon-button"
        @click="router.back()"
      />
      <IconPark
        :icon="Right"
        :size="iconSize"
        :stroke-width="2"
        class="icon-button"
      />
    </div>
    <div class="main">
      <div class="search">
        <SearchPop />
      </div>
      <div class="user">
        <UserInfo />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import IconPark from "@/components/common/iconPark.vue";
import {
  HamburgerButton,
  Left,
  Mail,
  Platte,
  Right,
  Search,
} from "@icon-park/vue-next";
import SearchPop from "./searchPop.vue";
import UserInfo from "./userInfo.vue";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";

const iconSize = ref(30);
const { showSearchView, searchKeyword } = storeToRefs(useSearchStore());
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid #000;
  width: 100%;
  height: 56px;
  box-sizing: border-box;
  position: relative;
  padding: 0 20px 0 60px;
  .back{
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-40%);
  }
  .main {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
