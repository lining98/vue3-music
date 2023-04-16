import { defineStore, storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { ISongUrl } from "@/models/songUrl";
import { ISongDetail } from "@/models/song";
import { getSongUrl, getSongDetail } from "@/utils/api";
import { ElMessage } from "element-plus";

const KEYS = {
  volume: "PLAYER-VOLUME",
};

export const usePlayerStore = defineStore({
  id: "player",
  state: () => ({
    audio: new Audio(), // Audio实例化
    loopType: 0, // 循环模式   0单曲循环  1列表循环  2随机播放
    volume: localStorage.getItem(KEYS.volume) || 60, // 音量
    playList: [] as ISongDetail[],
    showPlayList: false,

    id: 0,
    url: "",
    songUrl: {} as ISongUrl,
    song: {} as ISongDetail, // 音乐详情
    author: "", // 作者

    isPlaying: false, //是否播放中
    isPause: false, //是否暂停
    sliderInput: false, //是否正在拖动进度条
    ended: false, //是否播放结束
    muted: false, //是否静音
    currentTime: 0, //当前播放时间
    duration: 0, //总播放时长
  }),
  getters: {
    playListCount: (state) => {
      return state.playList.length;
    },
    thisIndex: (state) => {
      return state.playList.findIndex((song) => song.id === state.id);
    },
    nextSong(state): ISongDetail {
      const { thisIndex, playListCount } = this;
      if (thisIndex === playListCount - 1) {
        return state.playList[0];
      } else {
        const nextIndex: number = thisIndex + 1;
        return state.playList[nextIndex];
      }
    },
    prevSong(state): ISongDetail {
      const { thisIndex } = this;
      if (thisIndex === 0) {
        return state.playList.last();
      } else {
        const prevIndex: number = thisIndex - 1;
        return state.playList[prevIndex];
      }
    },
  },
  actions: {
    init() {
      this.audio.volume = parseInt(this.volume) / 100;
    },
    // 获取id播放音乐
    async play(id: number) {
      if (id == this.id) return;
      const data = await getSongUrl(id);

      this.audio.src = data.url;
      if (!data.url) {
        this.currentTime = 0
        ElMessage.error("找不到歌曲地址！");
        this.song = {} as ISongDetail;
        this.author = "";
        return;
      }
      console.log('play');

      this.audio.play().then(() => {
        this.isPause = true;
        this.songUrl = data;
        this.id = id;
        this.songDetail();
      });
    },
    // 根据id获取音乐详情
    async songDetail() {
      this.song = await getSongDetail(this.id);
      this.author = this.song.ar[0].name;
    },

    // 播放结束
    playEnd() {
      console.log("播放结束");
      switch (this.loopType) {
        case 0:
          this.rePlay();
          break;
        case 1:
          this.next();
          break;
        case 2:
          this.randomPlay();
          break;
      }
    },

    // 播放、暂停
    togglePlay() {
      if (!this.song.id) return;
      this.isPause = !this.isPause;
      if (this.isPause) {
        this.audio.play(); // 播放
        // this.isPause = true
      } else {
        this.audio.pause(); // 暂停
        // this.isPause = false
      }
    },

    clearPlayList() {
      this.songUrl = {} as ISongUrl;
      this.url = "";
      this.id = 0;
      this.song = {} as ISongDetail;
      this.isPlaying = false;
      this.isPause = false;
      this.sliderInput = false;
      this.ended = false;
      this.muted = false;
      this.currentTime = 0;
      this.playList = [] as ISongDetail[];
      this.showPlayList = false;
      this.audio.load();
      setTimeout(() => {
        this.duration = 0;
      }, 500);
    },

    //重新播放
    rePlay() {
      setTimeout(() => {
        this.currentTime = 0;
        this.audio.play();
      }, 1500);
    },

    // 下一曲
    next() {
      if (this.loopType === 2) {
        this.randomPlay();
      } else {
        this.play(this.prevSong.id);
      }
    },
    // 上一曲
    prev() {
      this.play(this.prevSong.id);
    },

    // 随机播放
    randomPlay() {
      this.play(this.playList.sample().id);
    },

    //音量设置
    setVolume(n: number) {
      n = n > 100 ? 100 : n;
      n = n < 0 ? 0 : n;
      this.volume = n;
      this.audio.volume = n / 100;
      localStorage.setItem("PLAYER-VOLUME", n.toString());
    },

    // 修改播放时间
    onSliderChange(val: number) {
      this.currentTime = val;
      this.sliderInput = false;
      this.audio.currentTime = val;
    },

    // 播放时间拖动中
    onSliderInput() {
      this.sliderInput = true;
    },

    // 定时器
    interval() {
      // if (this.isPlaying && !this.sliderInput) {
      if (!this.sliderInput) {
        this.currentTime = parseInt(this.audio.currentTime.toString());
        this.duration = parseInt(this.audio.duration.toString());
        this.ended = this.audio.ended;
      }
    },
  },
});

export const userPlayerInit = () => {
  let timer: NodeJs.Timer;
  const { init, interval, playEnd } = usePlayerStore();

  const { ended } = storeToRefs(usePlayerStore());

  //监听播放结束
  watch(ended, (ended) => {
    if (!ended) return;
    playEnd();
  });

  //   启动定时器
  onMounted(() => {
    init();
    console.log("启动定时器");
    timer = setInterval(interval, 1000);
  });

  //   清除定时器
  onUnmounted(() => {
    console.log("清除定时器");
    clearInterval(timer);
  });
};
