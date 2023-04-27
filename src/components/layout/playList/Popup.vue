<template>
  <!-- 歌词弹窗 -->
  <el-drawer
    v-model="showPopup"
    direction="btt"
    :with-header="false"
    :append-to-body="true"
    size="100%"
  >
    <div class="popup">
      <div class="main">
        <!-- 左侧图片 -->
        <div class='pic'>
          pic
        </div>
        <!-- 歌词部分 -->
        <!-- <div class="lyric" ref="lyric" style="height: 300px"> -->
        <div class="lyric-content" >
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
          <!-- <ElScrollbar> -->
            <div class="lyric" ref="lyric">
              <p
                v-for="(item, index) in lyricArr"
                :key="index"
                :class="{
                  active: lyricTime >= item.time && lyricTime <= item.next,
                }"
              >
                {{ item.lrc }}
              </p>
            </div>
          <!-- </ElScrollbar> -->
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
import { onMounted, onUnmounted, ref } from "vue";

const { song, lyricTime, showPopup, lyricArr } = storeToRefs(usePlayerStore());

let lyric = ref();
let timer: NodeJS.Timer;
onMounted(() => {
  // 歌词1s滚动刷新一次
  timer = setInterval(() => {
    let p: any = document.querySelector("p.active");
    if (p && p.offsetTop > 300) {
      lyric.value.scrollTop = p.offsetTop - 200;
    }
  }, 1000);
});
onUnmounted(() => {
  clearInterval(timer);
});
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

  background: -webkit-linear-gradient(to bottom,  #8ae28c 10%,   rgba(255,255,255,0.6));
  background: linear-gradient(to bottom,   #8ae28c 10%,   rgba(255,255,255,0.6));

  .main {
    display:flex;
    justify-content: space-around;
    // .pic{

    // }
    .lyric-content {
      text-align: center;

      .active {
        color: red;
      }
      .lyric{
        // margin: 0 auto;
        width: 400px;
        height: 400px;
        overflow-y: auto;
      }
    }
  }

  .footer{
    background: transparent;
  }
}
</style>
