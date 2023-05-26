<template>
  <div class="playlist">
    <div v-loading="albumLoading">
      <Info :album="albumDetail" :play-all="() => playAll()" />
    </div>
    <el-tabs v-model="tab">
      <el-tab-pane :label="`歌曲 ${songList.length}`" name="songs">
        <div v-loading="albumLoading">
          <!-- {{songList}} -->
          <MusicList :musicArr="songList" :showArName="true" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="评论" name="comments">
        <Comment
          :id="route.query.id"
          :type="3"
          :hotComents="hotComents"
          :newComents="newComents"
          :laoding="loading"
        />
      </el-tab-pane>
      <el-tab-pane label="专辑详情" name="desc">
        <p style="white-space: pre-wrap" v-html="albumDetail?.description"></p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref, toRefs, watch } from "vue";
import { getAlbumDetail } from "@/api/api";
import { ElMessage } from "element-plus";
import { useCommentStore } from "@/store/comment";
import { useRoute } from "vue-router";
import { usePlayerStore } from "@/store/player";
import { storeToRefs } from "pinia";

import Info from "./Info.vue";
import MusicList from "@/components/common/MusicList.vue";
import Comment from "@/components/common/Comment.vue";

const { getComment } = useCommentStore();
const { hotComents, newComents, loading } = storeToRefs(useCommentStore());

const tab = ref("songs");
const songList = ref([]);
const albumDetail = ref({});

const route = useRoute();

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

watch(
  () => route.query.id,
  (newId) => {
    if (route.name == "albumDetail") {
      getData(Number(newId));
    }
  }
);

let albumLoading = ref(true);

const getData = async (id: number) => {
  albumLoading.value = true;

  const { songs, album } = await getAlbumDetail(id);
  albumDetail.value = album;
  songList.value = songs;
  songList.value.forEach(
    (item: any, index: number) => (item.index = index + 1)
  );
  albumLoading.value = false;
};

onMounted(async () => {
  getData(Number(route.query.id));
  getComment({ id: route.query.id, type: 3 });
});
</script>

<style lang="scss" scoped></style>
