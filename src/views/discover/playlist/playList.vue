<template>
  <div v-loading="loading">
    <CPlaylist :playlists="catlistDetail.playlists" />
    <CPagination
      v-if="catlistDetail.total > 25 && changeCat"
      :count="catlistDetail.total"
      @sizeChange="handleChangePage"
      @currentChange="handleChangeCurrent"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useDiscoverStore } from "@/store/discover";
import { useRouter } from "vue-router";
import CPlaylist from "@/components/common/CPlaylist.vue";
import CPagination from "@/components/common/CPagination.vue";

const { cat, catlistDetail, loading, changeCat } = storeToRefs(
  useDiscoverStore()
);
const { hotPlaylist } = useDiscoverStore();
const router = useRouter();

const params = reactive({
  offset: 1,
  limit: 25,
  cat: cat.value,
});

const handleChangePage = (val: any) => {
  params.limit = val;
  hotPlaylist(params);
};
const handleChangeCurrent = (val: any) => {
  params.offset = params.limit * (val - 1);
  hotPlaylist(params);
};

watch(cat, (val) => {
  params.cat = val;
  params.offset = 1;
  params.limit = 25;
  changeCat.value = false;
  hotPlaylist(params);
});

onMounted(() => {
  hotPlaylist(params);
});
</script>
