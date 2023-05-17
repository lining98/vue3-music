<template>
  <div class="artist">
    <ul class="area">
      <li>语种：</li>
      <li
        v-for="item in category.area"
        :key="item.key"
        :class="params.area == item.key ? 'active' : ''"
        @click="optionChange(item.key, 'area')"
      >
        {{ item.name }}
      </li>
    </ul>
    <ul class="type">
      <li>分类：</li>
      <li
        v-for="item in category.type"
        :key="item.key"
        :class="params.type == item.key ? 'active' : ''"
        @click="optionChange(item.key, 'type')"
      >
        {{ item.name }}
      </li>
    </ul>
    <ul class="initial">
      <li>筛选：</li>
      <li
        v-for="item in category.initial"
        :key="item.key"
        :class="params.initial == item.key ? 'active' : ''"
        @click="optionChange(item.key, 'initial')"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
  <CArtist :artists="artistsList" />
  <div class="button">
    <el-button
      link
      type="primary"
      class="text-center w-full"
      @click="loadMore"
      :loading="loading"
      >加载更多</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getArtistList } from "@/api/discover";
import { staticSingerCategory } from "@/utils/useStaticData";
import CArtist from "@/components/common/CArtist.vue";

const artistsList = ref([]);
const category = staticSingerCategory;

const loading = ref(false);
const params = reactive({
  type: -1,
  area: -1,
  initial: "-1",
  page: 1,
  offset: 1,
  limit: 30,
});

const getData = async () => {
  loading.value = true;
  try {
    const { artists } = await getArtistList(params);
    if (params.page === 1) {
      artistsList.value = artists;
    } else {
      artistsList.value.push(...artists);
    }
    loading.value = false;
  } catch (e) {
    params.page--;
  }
};

const optionChange = (key: number | string, option: string) => {
  console.log(key, option);
  if (option == "area") params.area = key as number;
  if (option == "type") params.type = key as number;
  if (option == "initial") params.initial = key as string;

  getData();
};

const loadMore = () => {
  params.page++;
  params.offset = params.page * (params.page - 1);
  getData();
};

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.artist {
  ul {
    display: flex;
    margin: 10px 0;
    li:first-child {
      font-weight: bold;
    }
    li:not(li:first-child) {
      padding: 0 6px;
      margin: 0 3px;
      cursor: pointer;
    }
    li:hover:not(.active, li:first-child) {
      color: #34d399;
    }
    .active {
      border-radius: 3px;
      background-color: #34d399;
      color: #fff;
    }
  }
}
.button {
  text-align: center;
}
</style>
