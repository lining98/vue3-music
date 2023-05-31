<template>
  <div class="playlist">
    <div class="playlist-info">
      <Info
        :playlist="playlists"
        :loading="playlistsLoading"
        :play-all="() => playAll()"
      />
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="`歌曲列表(${songList.length || 0})`"
        name="songs"
        v-loading="songsLoading"
      >
        <MusicList
          :musicArr="songList"
          :showArName="true"
          :showLike="true"
          :like="(id) => likeS(id)"
        />
      </el-tab-pane>
      <el-tab-pane label="评论" name="comment">
        <Comment
          :id="route.query.id"
          :type="2"
          :hotComents="hotComents"
          :newComents="newComents"
        />
      </el-tab-pane>
      <el-tab-pane label="收藏者" name="collecter"> 收藏者 </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref, toRefs, watch } from "vue";
import { getPlaylistDetail, getPlaylistTrackAll } from "@/api/api";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/store/player";
import { useUserStore } from "@/store/user";
import { useRoute, useRouter } from "vue-router";

import Info from "./Info.vue";
import MusicList from "@/components/common/MusicList.vue";
import Comment from "@/components/common/Comment.vue";
import { useCommentStore } from "@/store/comment";

import { throttle } from "@/utils/utils";

const { likes } = storeToRefs(useUserStore());
const { Like } = useUserStore();

const { getComment } = useCommentStore();
const { hotComents, newComents } = storeToRefs(useCommentStore());

const route = useRoute();
const router = useRouter();

const activeName = ref("songs");
const playlists = ref([]);
const musicLists = reactive([]);
const songList = ref([]);
const playlistId = ref();
playlistId.value = route.query.id;

const { play, pushPlayList, randomPlay } = usePlayerStore();
const { loopType } = storeToRefs(usePlayerStore());
const playAll = () => {
  pushPlayList(true, ...songList.value);
  if (loopType.value) {
    play(songList.value[0].id);
  } else {
    randomPlay();
  }
};

let playlistsLoading = ref(true);
let songsLoading = ref(true);

const getSongs = async (id: number) => {
  songsLoading.value = true;

  // 获取歌单歌曲
  const songsAll = await getPlaylistTrackAll(id);
  songList.value = songsAll.songs;
  songList.value.forEach((item: any, index: number) => {
    item.index = index + 1;
    item.like = likes.value.indexOf(item.id) !== -1;
  });
  songsLoading.value = false;
};

const getData = async (id: number) => {
  getSongs(id);
  playlistsLoading.value = true;
  const { playlist } = await getPlaylistDetail(id);
  playlists.value = playlist;
  musicLists.value = playlist.tracks;
  playlistsLoading.value = false;
};

const likeS = throttle((id: number) => {
  Like(id);
  setTimeout(() => {
    getSongs(Number(route.query.id));
  }, 200);
}, 500);

onMounted(async () => {
  getData(Number(route.query.id));
  getComment({ id: route.query.id, type: 2 });
});

watch(
  () => route.query.id,
  (newId) => {
    if (route.name == "playlist") {
      activeName.value = "songs";
      getData(Number(newId));
      getComment({ id: newId, type: 2 });
    }
  }
);
</script>

<style lang="scss" scoped>
.playlist-info {
  min-height: 240px;
}
</style>
