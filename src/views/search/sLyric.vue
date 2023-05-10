<template>
  <div v-loading="loading">
    <div class="scount">
      共搜到<span>{{ dataList.songCount }}</span
      >个歌词
    </div>
    <ul class="list">
      <li v-for="item in dataList.songs">
        <div class="content">
          <div class="icon">
            <IconPark :icon="Play" size="16" @click="play(item.id)" />
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="artist ellipsis">
            <span v-for="(author, index) in item.ar" :key="author.id">
              <span
                class="clickable"
                @click="
                  router.push({
                    name: 'artistDetail',
                    query: { id: author.id },
                  })
                "
              >
                {{ author.name }}
              </span>
              <!-- 最后一个歌手后面不加分隔符 -->
              <span v-if="index != item.ar.length - 1">/</span>
            </span>
          </div>
          <div class="album ellipsis">
            <span
              class="clickable"
              @click="
                router.push({ name: 'albumDetail', query: { id: author.id } })
              "
              >{{ item.al.name }}</span
            >
          </div>
          <div class="dt">
            <span>{{ useFormatDuring(item.dt) }}</span>
          </div>
        </div>
        <div class="lyric">
          <div class="lyrics" :style="`height:${item.pst?'100%':'150px'}`">
            <p v-for="lyric in item.lyrics" v-html="lyric"></p>
          </div>
          <span class="clickable" @click="item.pst?item.pst=0:item.pst=1">{{ item.pst ? "收起":"展开" }}</span>
        </div>
      </li>
    </ul>
    <CPagination
      v-if="dataList.songCount > 30"
      :count="dataList.songCount"
      @sizeChange="handleChangePage"
      @currentChange="handleChangeCurrent"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CPagination from "@/components/common/CPagination.vue";
import IconPark from "@/components/common/iconPark.vue";
import { Play } from "@icon-park/vue-next";
import { useFormatDuring } from "@/utils/format";

const route = useRoute();
const type = route.query.type;
import useSearchPage from "./searchPage";
import { usePlayerStore } from "@/store/player";
const { info, loading, dataList, getData } = useSearchPage();
const { play } = usePlayerStore();

const router = useRouter();
const isShow = ref(true);

const handleChangePage = (val: any) => {
  info.limit = val;
  getData(info.offset, info.limit, type);
};
const handleChangeCurrent = (val: any) => {
  info.offset = info.limit * (val - 1);
  getData(info.offset, info.limit, type);
};

watch(
  () => route.fullPath,
  () => {
    if (Number(route.query.type) == 1006) {
      getData(0, 30, 1006);
    }
  }
);
onMounted(() => {
  getData(0, 30, 1006);
});
</script>

<style lang="scss" scoped>
.list {
  li {
    .content {
      height: 40px;
      display: flex;
      align-items: center;
      .icon {
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .name {
        flex: 1;
        min-width: 350px;
        padding-left: 10px;
      }
      .artist,
      .album {
        width: 200px;
        padding: 0 10px;
      }
      .dt{
        padding-right:15px;
      }
    }

    .lyric {
      padding: 10px 0 20px 50px;
      .lyrics{
        // height: 150px;
        overflow: hidden;

      }
    }
  }
  li:nth-child(2n) .content {
    background-color: #f7f7f7;
  }
}
</style>
