<template>
  <div class="recent-songs" v-loading="loading">
    <el-table
      :data="musicArr"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @row-dblclick="playSong"
    >
      <el-table-column type="index" width="50">
        <template #default="scope, index">
          <IconPark
            v-if="scope.row.data.id === song.id"
            :icon="VolumeSmall"
            theme="filled"
          />
          <span v-else>{{ scope.row.index }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="50">
        <template #default="scope">
          <IconPark :icon="Like" size="16" class="like" />
        </template>
      </el-table-column> -->
      <el-table-column prop="data.name" label="音乐标题" min-width="300" />
      <el-table-column prop="data.ar[0].name" label="歌手" min-width="160">
        <template #default="scope">
          <span v-for="(author, index) in scope.row.data.ar" :key="author.id">
            <!--  -->
            <span class="clickable" @click="toSingerDetails(author.id)">
              {{ author.name }}
            </span>
            <span v-if="index != scope.row.data.ar.length - 1">/</span>
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="data.al.name" label="专辑" min-width="260">
        <template #default="scope">
          <span
            class="clickable"
            @click="toAlbumDetails(scope.row.data.al.id)"
            >{{ scope.row.data.al.name }}</span
          >
        </template>
      </el-table-column>

      <el-table-column prop="data.dt" label="时间" min-width="80">
        <template #default="scope">
          <span>{{ useFormatDuring(scope.row.data.dt) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePlayerStore } from "@/store/player";
import { getRecentSong } from "@/api/recent";
import { Like, VolumeSmall } from "@icon-park/vue-next";
import CAlbum from "@/components/common/CAlbum.vue";
import IconPark from "@/components/common/IconPark.vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useFormatDuring } from "@/utils/format";
import { ElMessage } from "element-plus";
// import MusicList from '@/components/common/MusicList.vue'

const router = useRouter();
const { song } = storeToRefs(usePlayerStore());
const { play, pushPlayList } = usePlayerStore();

const playSong = (row: any) => {
  play(row.data.id);
};

function tableRowClassName({ row, rowIndex }: { row: any; rowIndex: number }) {
  if (row.data.id == song.value.id) {
    return "active";
  }
}
function toSingerDetails(id: number) {
  if (id) {
    router.push({
      name: "artistDetail",
      query: { id: id },
    });
  } else {
    ElMessage.error("无相关艺人");
  }
}

const loading = ref(false);
const musicArr = ref([]);
const getData = async () => {
  loading.value = true;
  const { data, total } = await getRecentSong();
  musicArr.value = data.list;
  musicArr.value.forEach(
    (item: any, index: number) => (item.index = index + 1)
  );
  loading.value = false;
};

onMounted(getData);
</script>

<style lang="scss" scoped>
.recent-songs {
  :deep(.cell) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
