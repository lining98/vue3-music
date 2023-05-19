<template>
  <div class="artist">
    <ul class="select" v-for="item in category" :key="item.key">
      <li>{{ item.name }}</li>
      <li
        v-for="cat in item.child"
        :key="cat.key"
        :class="params[item.key] == cat.key ? 'active' : ''"
        @click="optionChange(cat.key,item.key )"
      >
        {{ cat.name }}
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
  // console.log(key, option);
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
.button {
  text-align: center;
}
</style>
