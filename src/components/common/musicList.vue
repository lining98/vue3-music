<template>
  <div class="songlist">
    <!-- stripes -->
    <el-table
      :data="musicArr"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @row-dblclick="playSong"
    >
      <el-table-column type="index" width="50" >
        <template #default="scope,index">
          <IconPark v-if="scope.row.id === id" :icon='VolumeSmall' theme='filled'  />
          <span v-else>{{index}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column width="50">
        <template #default="scope">
          <IconPark :icon="Like" size="16" class="like" />
        </template>
      </el-table-column> -->
      <el-table-column prop="name" label="标题" />
      <el-table-column
        v-if="showArName"
        prop="ar[0].name"
        label="歌手"
        width="160"
      >
        <template #default="scope">
          <span v-for="(author, index) in scope.row.ar" :key="author.id">
            <span class="clickable" @click="toSingerDetails(author.id)">
              {{ author.name }}
            </span>
            <!-- 最后一个歌手后面不加分隔符 -->
            <span v-if="index != scope.row.ar.length - 1">/</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" width="260">
        <template #default="scope">
          <span class="clickable" @click="toAlbumDetails(scope.row.al.id)">{{
            scope.row.al.name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dt" label="时间" width="100">
        <template #default="scope">
          <span>{{ useFormatDuring(scope.row.dt) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import IconPark from "@/components/common/iconPark.vue";
import { Like, VolumeSmall } from "@icon-park/vue-next";
import { useFormatDuring } from "@/utils/numbers";
import { usePlayerStore } from "@/store/player";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user";
import { getLikelist } from "@/api/api";
import { onMounted } from "vue";

const props = defineProps(["musicArr", "showArName"]);

const route = useRoute()
const router = useRouter();
const { profile, playlist } = storeToRefs(useUserStore());
const { id } = storeToRefs(usePlayerStore());
const { play, pushPlayList } = usePlayerStore();
const playSong = (row: any) => {
  play(row.id);
  pushPlayList(true, ...props.musicArr);
};

function tableRowClassName({ row, rowIndex }: { row: any; rowIndex: number }) {
  // 把每一行的索引放进row
  // row.index = rowIndex;
  if (row.id == id.value) {
    return "active";
  }
}

function toSingerDetails(id: number) {
  router.push({
    name: "artistDetail",
    query: { id: id },
  });
}
function toAlbumDetails(id: number) {
  router.push({
    name: "albumDetail",
    query: { id: id },
  });
}

// const getData =  async()=>{
//   const likes = await getLikelist(profile.value.userId)
// }
// onMounted(getData)
</script>

<style lang="scss" scoped>
.songlist {
  .clickable {
    cursor: pointer;
  }
  .clickable:hover {
    color: #39c6ad;
    text-decoration: underline;
  }
  // .like:hover {
  //   cursor: pointer;
  //   color: #f87171;
  // }
  :deep(.el-table .active) {
    --el-table-tr-bg-color: #d8fceb;
  }
}
</style>
