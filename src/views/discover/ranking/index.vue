<template>
  <div class="ranking">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="official">
          <h2>云音乐特色榜</h2>
          <div class="item" v-for="item in 4" :key="item">
            <div class="img">
              <el-skeleton-item
                variant="image"
                style="width: 150px; height: 150px"
              />
            </div>
            <ul class="list">
              <li v-for="ite in 3" :key="ite">
                <span>{{ ite }}</span>
                <p>
                  <el-skeleton-item variant="text" style="width: 200px" />
                  <el-skeleton-item variant="text" style="width: 50px" />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <template #default>
        <div class="official">
          <h2>云音乐特色榜</h2>
          <div
            class="item"
            v-for="item in officialList"
            :key="item.id"
            @click="toPlaylist(item.id)"
          >
            <img class="img" :src="item.coverImgUrl" alt="" />
            <ul class="list">
              <li v-for="(ite, index) in item.tracks" :key="index">
                <span>{{ index + 1 }}</span>
                <p>
                  <span>{{ ite.first }}</span>
                  <span>{{ ite.second }}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="global">
          <h2>全球媒体榜</h2>
          <div class="global-list">
            <div
              class="item"
              v-for="item in globalList"
              :key="item.id"
              @click="toPlaylist(item.id)"
            >
              <div class="img">
                <el-image lazy :src="item.coverImgUrl"></el-image>
              </div>
              <p class="ellipsis">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getToplistDetail } from "@/api/discover";
import { useRouter } from "vue-router";

const router = useRouter();

const loading = ref(true);
const topList = ref([]);
const officialList = ref([]);
const globalList = ref([]);

const toPlaylist = (id) => {
  router.push({ name: "playlist", query: { id: id } });
};

const getData = async () => {
  loading.value = true;
  const { list } = await getToplistDetail();
  list.map((item) => {
    if (item.tracks.length) {
      officialList.value.push(item);
    } else {
      globalList.value.push(item);
    }
  });
  loading.value = false;
};

onMounted(getData);
</script>

<style lang="scss" scoped>
.ranking {
  // 云音乐特色榜
  .official {
    .item {
      width: 100%;
      display: flex;
      margin-bottom: 10px;
      border: 1px solid #e4e7ed;
      border-radius: 10px;
      cursor: pointer;
      .img {
        width: 150px;
        margin-right: 20px;
        border-radius: 10px;
      }
      .list {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        li {
          display: flex;
          p {
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
    .item,
    .list,
    li,
    p {
      width: 100%;
      box-sizing: border-box;
    }
  }
  // 全球媒体榜
  .global {
    margin-top: 30px;
    .global-list {
      margin-top: 15px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      .item {
        width: 200px;
        margin: 0 10px 30px;
        cursor: pointer;
        .img {
          width: 100%;
          height: 200px;
        }
        p {
          text-align: center;
        }
      }
    }
  }
}
</style>
