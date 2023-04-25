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
        <div class="lyric" style="height: 600px">
          <div class="name">
            <h2>{{ song.name }}</h2>
            <span v-for="(item, index) in song.ar">
              <span
                class="clickable"
                @click="
                  router.push({ name: 'artistDetail', query: { id: item.id } })
                "
                >{{ item.name }}</span
              >
              <span v-if="index != song.ar.length - 1">/</span>
            </span>
          </div>

          <ElScrollbar>
            <!-- {{lrc}} -->
            <p
              v-for="(item,index) in lyricArr"
              :key="index"
              :class="{
                active: lyricTime >= item.time && lyricTime <= item.next,
              }"
            >
              <span style="display:inline-block;width:300px;">{{Number(lyricTime).toFixed(0)}}</span>---{{item.time}}-{{ item.lrc }}-{{item.next}}
            </p>
          </ElScrollbar>
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

const { song, lyricTime, showPopup, lyricArr } = storeToRefs(usePlayerStore());
</script>

<style lang="scss" scoped>
.popup {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  .main {
    .lyric {
      text-align: center;

      .active {
        color: red;
      }
    }
  }
}
</style>
