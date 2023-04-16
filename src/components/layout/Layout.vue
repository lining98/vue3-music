<script setup lang="ts">
import Menu from "@/components/layout/menu/Menu.vue";
import Footer from "@/components/layout/footer/Footer.vue";
import Header from "@/components/layout/header/Header.vue";
import { ref } from "vue";
</script>

<template>
  <div class="module">
    <div class="module-left">
      <Menu />
    </div>
    <div class="module-main">
      <Header />
      <ElScrollbar>
        <div class="main">
          <router-view />
        </div>
      </ElScrollbar>
      <Footer />
    </div>
  </div>
</template>

<style lang="scss">
.module {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .module-left {
    flex-shrink: 0;
    width: 220px;
    background: #f9fafb;
    padding-top: 30px;
    .module-menu {
      padding: 0 20px;
      .menus-title {
        font-size: 12px;
        margin: 20px 0 10px 0;
      }
      .menus-item {
        // padding: 6px 0;
        margin: 6px 0;
        & > a {
          padding: 6px 20px;
          //   height: 20px;
          display: flex;
          font-size: 14px;
          align-items: center;
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
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    .main {
      h1 {
        font-size: 30px;
        margin-bottom: 10px;
      }
      // padding: 20px 50px 0;
      // margin: 0 auto;
      flex: 1;
    }
  }
}
</style>
