<script setup lang="ts">
import Menu from "@/components/layout/menu/Menu.vue";
import Footer from "@/components/layout/footer/Footer.vue";
import Header from "@/components/layout/header/Header.vue";
import PlayList from "@/components/layout/playList/PlayList.vue";
import Popup from "@/components/layout/playList/Popup.vue";
import { ref } from "vue";
</script>

<template>
  <div class="module">
    <div class="module-left">
      <ElScrollbar>
        <Menu />
      </ElScrollbar>
    </div>
    <div class="module-main">
      <Header />
      <ElScrollbar class="main">
        <div class="container">
          <router-view />
        </div>
        <el-backtop
          target=".module .module-main .el-scrollbar__wrap"
          :bottom="100"
        />
      </ElScrollbar>
      <Footer />
    </div>
    <PlayList />
    <Popup />
  </div>
</template>

<style lang="scss">
.module {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background: #f9fafb;
  .module-left {
    min-width: 270px;
    padding-top: 30px;
    padding-bottom: 20px;
    .module-menu {
      padding: 0 20px;
      .menus-title {
        font-size: 12px;
        margin: 20px 0 10px 0;
      }
      .menus-item {
        margin: 6px 0;
        & > a {
          padding: 6px 20px;
          display: flex;
          font-size: 14px;
          align-items: center;

          &:hover:not(.active) {
            background-color: #f4f2f2;
          }
          > span {
            display: flex;
            align-items: center;
            margin-right: 3px;
          }
        }
      }

      .active {
        background: #39c6ad;
        color: #fff;
        border-radius: 5px;
      }
    }
  }
  .module-main {
    flex: 1;
    background: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .main {
      flex: 1;
      box-sizing: border-box;
      padding: 30px 50px 20px;
      .container {
        margin-left: auto;
        margin-right: auto;
      }
      h1 {
        font-size: 30px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
