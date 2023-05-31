<template>
  <div class="playlist">
    <div v-loading="albumLoading">
      <Info :album="albumDetail" :play-all="() => playAll()" />
    </div>
    <el-tabs v-model="tab">
      <el-tab-pane :label="`歌曲 ${songList.length}`" name="songs">
        <div v-loading="albumLoading">
          <MusicList
            :musicArr="songList"
            :showArName="true"
            :showLike="true"
            :like="(id) => likeS(id)"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="评论" name="comments">
        <Comment
          :id="route.query.id"
          :type="3"
          :hotComents="hotComents"
          :newComents="newComents"
        />
      </el-tab-pane>
      <el-tab-pane label="专辑详情" name="desc">
        <p
          v-if="albumDetail?.description"
          style="white-space: pre-wrap"
          v-html="albumDetail?.description"
        ></p>
        <el-empty v-else description="该专辑没有描述哦！"></el-empty>
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
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

import Info from "./Info.vue";
import MusicList from "@/components/common/MusicList.vue";
import Comment from "@/components/common/Comment.vue";
import { throttle } from "@/utils/utils";

const { likes } = storeToRefs(useUserStore());
const { Like } = useUserStore();

const { getComment } = useCommentStore();
const { hotComents, newComents } = storeToRefs(useCommentStore());

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

let albumLoading = ref(true);

const getData = async (id: number) => {
  albumLoading.value = true;

  const { songs, album } = await getAlbumDetail(id);
  albumDetail.value = album;
  songList.value = songs;
  songList.value.forEach((item: any, index: number) => {
    item.index = index + 1;
    item.like = likes.value.indexOf(item.id) !== -1;
  });
  albumLoading.value = false;
};

const likeS = throttle((id: number) => {
  Like(id);
  setTimeout(() => {
    getData(Number(route.query.id));
  }, 200);
}, 500);

onMounted(async () => {
  getData(Number(route.query.id));
  getComment({ id: route.query.id, type: 3 });
});

watch(
  () => route.query.id,
  (newId) => {
    if (route.name == "albumDetail") {
      getData(Number(newId));
    }
  }
);
</script>

<style lang="scss" scoped></style>
