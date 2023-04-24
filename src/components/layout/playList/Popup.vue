<template>
  <el-drawer
    v-model="showPopup"
    direction="btt"
    :with-header="false"
    :append-to-body="true"
    size="100%"
  >
    <div class="popup">
      <div class="main">
        <!-- 歌词部分 -->
        <div class="lyric">
          <p>歌词</p>
          <!-- {{lrc}} -->
          <p v-for="item in lrc">
            {{item.lyric}}
          </p>
        </div>
      </div>
      <Footer class="footer" />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import Footer from "@/components/layout/footer/Footer.vue";
import { usePlayerStore } from "@/store/player";
import { storeToRefs } from "pinia";

const { showPopup,lrc } = storeToRefs(usePlayerStore());
</script>

<style lang="scss" scoped>
.popup {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .main{
    .lyric{
      text-align: center;
    }
  }
}
</style>
