import { sample, last } from "lodash";
import { defineStore, storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { ISongUrl } from "@/models/songUrl";
import { ISongDetail } from "@/models/song";
import { getSongUrl, getSongDetail, getLyric } from "@/api/api";
import { ElMessage } from "element-plus";
import { formatLyric } from "@/utils/format";

const KEYS = {
  volume: "PLAYER-VOLUME",
};

export const usePlayerStore = defineStore({
  id: "player",
  state: () => ({
    audio: new Audio(), // Audio实例化
    loopType: 2, // 循环模式   0随机播放  1单曲循环  2列表循环
    volume: Number(localStorage.getItem(KEYS.volume)) || 60, // 音量
    // playList: [] as ISongDetail[],
    playList: JSON.parse(localStorage.getItem("playList")) || [],
    showPlayList: false,
    showPopup: false,

    id: 0,
    url: "",
    songUrl: {} as ISongUrl,
    // song: {} as ISongDetail, // 音乐详情
    song: JSON.parse(localStorage.getItem("songDetail")) || ({} as ISongDetail),
    lyricDetail: {},
    lyricArr: [],
    yrc: [],

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
        return last(state.playList);
      } else {
        const prevIndex: number = thisIndex - 1;
        return state.playList[prevIndex];
      }
    },
    lyricTime(state){
      return state.currentTime * 1000;
    }
  },
  actions: {
    init() {
      this.audio.volume = this.volume / 100;
    },

    // 播放列表里面添加音乐
    pushPlayList(replace: boolean, ...list: ISongDetail[]) {
      if (replace) {
        this.playList = list;
        localStorage.setItem("playList", JSON.stringify(list));
        return;
      }
      list.forEach((song) => {
        if (this.playList.filter((s) => s.id === song.id).length <= 0) {
          this.playList.push(song);
        }
      });
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

    // 获取id播放音乐
    async play(id: number) {
      if (id == this.id) return;
      const data = await getSongUrl(id);
      this.audio.src = data.url;
      // if (!data.url) {
      //   this.currentTime = 0;
      //   ElMessage.error("暂无音频已自动切换下一首！");
      //   this.song = {} as ISongDetail;
      //   return;
      // }

      // let that = this
      // this.audio.addEventListener('error',function(){
      //   let timer = null;
      //   if(timer) clearTimeout(timer)
      //   timer = setTimeout(() => {
      //     ElMessage.error("暂无音频已自动切换下一首！");
      //   }, 200);
      //   // that.next()
      // })


      this.audio.play().then(() => {
        this.isPause = true;
        this.songUrl = data;
        this.id = id;
        this.songDetail();
        this.getLyricDetail();
      });
    },
    // 根据id获取音乐详情
    async songDetail() {
      this.song = await getSongDetail(this.id);

      this.pushPlayList(false, this.song);
      localStorage.setItem("songDetail", JSON.stringify(this.song));
    },
    // 获取歌词
    async getLyricDetail() {
      const {lrc} = await getLyric(this.id);
      this.lyricArr = formatLyric(lrc.lyric)
    },

    // 播放结束
    playEnd() {
      console.log("播放结束");
      switch (this.loopType) {
        case 0:
          this.randomPlay();
          break;
        case 1:
          this.rePlay();
          break;
        case 2:
          this.next();
          break;
      }
    },

    // 播放、暂停
    togglePlay() {
      if (!this.song.id) return;
      this.isPause = !this.isPause;
      if (this.isPause) {
        this.play(this.song.id); // 播放
        this.audio.play(); // 播放
      } else {
        // this.audio.pause(); // 暂停
        this.audio.pause(); // 暂停
      }
    },

    // 切换循环类型
    toggleLoop() {
      if (this.loopType == 2) {
        this.loopType = 0;
      } else {
        this.loopType++;
      }
    },

    // 静音切换
    toggleMuted() {
      console.log(this.muted);

      this.muted = !this.muted;
      this.audio.muted = this.muted;
    },

    //重新播放
    rePlay() {
      setTimeout(() => {
        this.currentTime = 0;
        this.audio.play();
      }, 1500);
    },

    // 上一曲
    prev() {
      // console.log('上一曲');
      this.play(this.prevSong.id);
    },
    // 下一曲
    next() {
      // console.log('下一曲');
      if (this.loopType === 0) {
        this.randomPlay();
      } else {
        this.play(this.nextSong.id);
      }
    },

    // 随机播放
    randomPlay() {
      let song = sample(this.playList);
      this.play(song.id);
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
