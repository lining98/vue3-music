<template>
  <el-popover
    placement="bottom-start"
    v-model:visible="showSearchView"
    width="320"
  >
    <template #reference>
      <div>
        <ElInput
          v-model="searchKeyword"
          placeholder="搜索音乐、MV、歌单"
          clearable
          @input="searchInput"
          @keydown.enter="search"
          @focus="showSearchView = true"
          @focusout="showSearchView = false"
          style="width: 250px"
        />
        <el-button
          type="primary"
          :icon="Search"
          style="font-size: 20px"
          @click="search"
        />
      </div>
    </template>
    <div style="height: 480px">
      <el-scrollbar>
        <div v-if="showHot">
          <div class="title">热门搜索</div>
          <ul class="list">
            <li
              v-for="(item, index) in searchHot"
              :key="item.searchWord"
              @click="hotClick(item.searchWord)"
            >
              <div class="index">{{ index + 1 }}</div>
              <div class="text">
                <span class="name"
                  >{{ item.searchWord }}
                  <span class="content">{{ item.score }}</span></span
                >
                <span class="content">{{ item.content }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          <SearchSuggest />
        </div>
      </el-scrollbar>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";
import { Search } from "@icon-park/vue-next";
import { storeToRefs } from "pinia";
import type { ISearchHotDetail } from "@/models/search";
import { useSearchStore } from "@/store/search";
import { getSearchHotDetail, getSearchResult } from "@/api/api";
import { debounce } from "lodash";
const { keywords,showSearchView, searchKeyword, showHot } = storeToRefs(useSearchStore());
const { suggest } = useSearchStore();

import SearchSuggest from "./searchSuggest.vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const searchInput = debounce((value: string | number) => suggest(), 500, {
  maxWait: 1000,
});

const searchHot = ref<ISearchHotDetail[]>([]);
onMounted(async () => {
  searchHot.value = await getSearchHotDetail();
});

const hotClick = (text: string) => {
  searchKeyword.value = text;
  keywords.value = text;
  localStorage.setItem('keywords',text)
  suggest();
  showSearchView.value = false;
  router.push("/search/song");
};

function search() {
  if (!searchKeyword.value) return;
  localStorage.setItem('keywords',searchKeyword.value)
  keywords.value = searchKeyword.value
  getSearchResult({ keywords: keywords.value, type: route.query.type });
  if (route.path.indexOf("search") == -1) {
    router.push({
      name:'searchSong',
      query:{
        keywords:searchKeyword.value,
        type:1
      }
    })
  }else{
    router.push({
      name:route.name,
      query:{
        keywords:searchKeyword.value,
        type:route.query.type
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.title {
  height: 40px;
  line-height: 40px;
}
.list {
  li {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    opacity: 0.8;
    cursor: pointer;
    .index {
      width: 30px;
      height: 40px;
      line-height: 40px;
      text-align: left;
    }
    .text {
      width: 100%;
      height: 40px;
      display: flex;
      flex-direction: column;
      .name {
        font-size: 14px;
        color: #606266;
        font-weight: bold;
        span {
          margin-left: 10px;
          color: #c0c0c0;
          font-weight: lighter;
        }
      }
      .content {
        font-size: 12px;
        color: #999;
      }
    }
  }
  li:nth-child(-n + 3) .index {
    color: red;
  }
  li:hover {
    opacity: 1;
  }
}
</style>
