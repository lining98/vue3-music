<template>
  <div class="songlist">
    <el-table
      :data="musicArr"
      stripe
      style="width: 100%"
      @row-dblclick="playSong"
    >
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="标题" />
      <el-table-column
        prop="ar[0].name"
        label="歌手"
        width="160"
      >
        <template #default="scope">
          <span v-for="(author, index) in scope.row.ar" :key="author.id">
            <span class="clikable" @click="toSingerDetails(author.id)">
              {{ author.name }}
            </span>
            <!-- 最后一个歌手后面不加分隔符 -->
            <span v-if="index != scope.row.ar.length - 1">/</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" max-width="260">
        <template #default="scope">
          <span class="clikable" @click="toAlbumDetails(scope.row.al.id)">{{
            scope.row.al.name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dt" label="时间" max-width="100">
        <template #default="scope">
          <span>{{ useFormatDuring(scope.row.dt) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { useFormatDuring } from "@/utils/numbers";
import { usePlayerStore } from "@/store/player";
import { useRoute, useRouter } from "vue-router";

// const msg = ref("音乐列表")
defineProps(["musicArr"]);

const { play } = usePlayerStore();
const playSong = (row: any) => {
  // console.log(row);
  play(row.id);
};
const router = useRouter()


function toSingerDetails(id: number) {
  router.push({
    name: "artistDetail",
    query: { id: id },
  });
}
function toAlbumDetails(id: number) {
  router.push(`/albumDetail/${id}`);
}
</script>

<style lang="scss" scoped>
.songlist {
  .clikable {
    cursor: pointer;
  }
  .clikable:hover {
    color: #39c6ad;
    text-decoration: underline;
  }
}
</style>
