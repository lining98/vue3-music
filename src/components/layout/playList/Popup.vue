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
      <div class="popup-bg" :style="{ backgroundImage: picUrl }"></div>
      <div class="main">
        <!-- 左侧唱盘部分 -->
        <div class="pic">
          <img
            class="needle"
            :class="{ crush: isPause }"
            src="./img/needle.png"
            alt=""
          />
          <img
            class="picUrl"
            :style="`animation-play-state:${isPause ? 'running' : 'paused'} `"
            alt=""
            :src="song.al?.picUrl || defaultImg"
          />
        </div>
        <!-- 歌词部分 -->
        <!-- <div class="lyric" ref="lyric" style="height: 300px"> -->
        <div class="lyric-content">
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
import { computed, onMounted, onUnmounted, ref } from "vue";

import defaultImg from "@/assets/img/OpticalDisk.png";

const { isPause, song, lyricTime, showPopup, lyricArr } = storeToRefs(
  usePlayerStore()
);

let lyric = ref();
let timer: NodeJS.Timer;
const picUrl = computed(() => {
  return song.value.al?.picUrl
    ? `url(${song.value.al.picUrl})`
    : `url(${defaultImg})`;
});
onMounted(() => {
  // 歌词1s滚动刷新一次
  timer = setInterval(() => {
    let p: any = document.querySelector("p.active");
    if (p && p.offsetTop > 300) {
      lyric.value.scrollTop = p.offsetTop - 260;
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
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);

  .main {
    display: flex;
    justify-content: space-around;
    padding-top: 100px;
    .pic {
      display: flex;
      flex-direction: column;
      .needle {
        width: 120px;
        transform: rotate(0deg);
        transform-origin: 0 0;
        position: relative;
        left: 150px;
        top: 20px;
        z-index: 10;
        transition: all 0.5s;
      }
      .crush {
        transform: rotate(20deg);
      }
      .picUrl {
        position: relative;
        width: 200px;
        border-radius: 50%;
        border: 50px solid #131315;
        animation: rotate_360 10s linear infinite;
        // background-image: url('asd');
      }

      @keyframes rotate_360 {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
    .lyric-content {
      text-align: center;
      color: rgba(255, 255, 255, 0.966);

      .active {
        color: #11ffa8;
      }
      .lyric {
        // margin: 0 auto;
        width: 400px;
        height: 400px;
        overflow-y: auto;
        p {
          height: 35px;
          line-height: 35px;
        }
      }
    }
  }

  .footer {
    background-color: transparent;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.7) 50%
    );
  }
}

.popup-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.popup-bg {
  z-index: -2;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  filter: blur(12px);
  opacity: 0.6;
  transition: all 0.8s;
  transform: scale(1.1);
}
</style>
