<template>
  <div class="dynamic" v-infinite-scroll="load">
    <h2>{{ msg }}</h2>
    <el-skeleton :loading="firstLoading" animated
      ><template #template>
        <div class="item" v-for="item in 5" :key="item">
          <div class="item-content">
            <el-skeleton-item
              variant="image"
              style="width: 40px; height: 40px; margin-right: 10px"
            />
            <div class="right">
              <div class="title">
                <el-skeleton-item variant="p" style="width: 200px" />
              </div>
              <div class="time">
                <el-skeleton-item variant="p" style="width: 100px" />
              </div>
              <el-skeleton :rows="3" />
            </div>
          </div>
          <el-divider />
        </div>
      </template>
      <template #default>
        <div class="item" v-for="item in eventList" :key="item.id">
          <div class="item-content">
            <img class="avatarUrl" :src="item.user.avatarUrl" alt="" />
            <div class="right">
              <div class="title">
                {{ item.user.nickname }}
                <img :src="item.user.avatarDetail?.identityIconUrl" alt="" />
                <span v-if="JSON.parse(item.json).song">分享单曲</span>
              </div>
              <div class="time">{{ formatDate(item.showTime, true) }}</div>
              <p v-html="JSON.parse(item.json).msg"></p>
              <div class="song" v-if="JSON.parse(item.json).song">
                <div
                  class="songimg"
                  @click="play(JSON.parse(item.json).song?.id)"
                >
                  <img
                    :src="
                      JSON.parse(item.json).song?.img80x80 ||
                      JSON.parse(item.json).song?.extProperties?.img80x80
                    "
                    alt=""
                  />
                  <div class="play"><IconPark :icon="Play" size="22" /></div>
                </div>
                <div>
                  <a class="name">{{ JSON.parse(item.json).song?.name }}</a>
                  <a
                    class="artist"
                    @click="
                      router.push({
                        name: 'artistDetail',
                        query: {
                          id: JSON.parse(item.json).song?.artists[0].id,
                        },
                      })
                    "
                    >{{ JSON.parse(item.json).song?.artists[0].name }}</a
                  >
                </div>
              </div>
              <div class="imgs">
                <img
                  v-if="item.pics"
                  v-for="(img, i) in item.pics"
                  :key="i"
                  :src="img.originUrl"
                  alt=""
                />
              </div>
            </div>
          </div>
          <el-divider />
        </div>
      </template>
    </el-skeleton>
    <div class="loadMore">
    <el-button link type="primary" class="text-center w-full" :loading="loading"
      >加载更多</el-button
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { getEvent } from "@/api/dynamic";
import { formatDate } from "@/utils/format";
import IconPark from "@/components/common/iconPark.vue";
import { Play } from "@icon-park/vue-next";
import { usePlayerStore } from "@/store/player";
import { useRouter } from "vue-router";
const { play } = usePlayerStore();
const router = useRouter();

const msg = ref("动态");
const firstLoading = ref(false);
const loading = ref(false);
const pagesize = ref(5);
const lastTime = ref(-1);
const eventList = ref([]);

const getData = async () => {
  try {
    const { event, lasttime, more } = await getEvent(
      pagesize.value,
      lastTime.value
    );
    if (lastTime.value === -1) {
      eventList.value = event;
    } else {
      eventList.value.push(...event);
    }
    lastTime.value = lasttime;
    loading.value = false;
    firstLoading.value = false;
  } catch (e) {
    lastTime.value = -1;
  }
};
const load = () => {
  console.log("aaa");

  loading.value = true;
  setTimeout(() => {
    getData();
  }, 1000);
};

onMounted(() => {
  firstLoading.value = true;
  getData();
});
</script>

<style lang="scss" scoped>
.dynamic {
  h2 {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #34d399;
  }
  .item {
    .item-content {
      display: flex;
      .right {
        flex: 1;
      }
      .title {
        display: flex;
        align-items: center;
        img {
          width: 16px;
          margin: 0 5px;
        }
      }
      .avatarUrl {
        width: 45px;
        height: 45px;
        margin-right: 10px;
      }
      .time {
        font-size: 12px;
        color: #333;
        margin: 8px 0 15px;
      }
      .song {
        width: 100%;
        background-color: #f5f5f5;
        box-sizing: border-box;
        padding: 10px;
        margin: 4px 0 5px;
        display: flex;
        cursor: pointer;
        .songimg {
          position: relative;
          img {
            width: 40px;
            height: 40px;
            margin-right: 10px;
            box-sizing: border-box;
            border: 1px solid rgba(0, 0, 0, 0.3);
          }

          .play {
            position: absolute;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            .i-icon {
              color: #fff;
              opacity: 0.8;
            }
            &:hover .i-icon {
              opacity: 0.95;
            }
          }
        }
        div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          a:hover {
            text-decoration: underline;
          }
          a:nth-child(1) {
            color: #333;
            font-size: 14px;
          }
          a:nth-child(2) {
            color: #666;
            font-size: 12px;
          }
        }
      }
      .imgs {
        img {
          max-width: 220px;
          margin-right: 5px;
        }
      }
    }
  }

  .loadMore{
    text-align: center;
  }
}
</style>
