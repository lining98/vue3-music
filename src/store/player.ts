import { defineStore } from "pinia";
import { ref } from "vue";
import { ISongUrl } from "@/models/songUrl";
import { getSongUrl, getSongDetail } from "@/utils/api";

export const usePlayerStore = defineStore({
  id: "player",
  state: () => ({
    audio: new Audio(), // Audio实例化

    id: 0,
    songUrl: "",
    song: {}, // 音乐详情

    isPlaying: false, //是否播放中
    isPause: false,//是否暂停
    sliderInput: false,//是否正在拖动进度条
    ended: false,//是否播放结束
    muted: false,//是否静音
    currentTime: 0,//当前播放时间
    duration: 0,//总播放时长
  }),
  actions: {
    async play(id: number) {
      if (id == this.id) return; //获取不到歌曲的id
      //   console.log("play", id);
      const data = await getSongUrl(id);
      this.audio.src = data.url;
      this.audio.play().then(() => {
        this.isPause = true;
        this.songUrl = data;
        this.id = id;
        this.songDetail();
      });
      //   const songDetail = await getSongDetail(id);
      //   console.log("songDetail", songDetail);
    },
    togglePlay() {
      this.isPause = !this.isPause;
      if (this.isPause) {
        this.audio.play(); // 播放
      } else {
        this.audio.pause(); // 暂停
      }
    },
    async songDetail() {
      this.song = await getSongDetail(this.id);
    },
  },
});
