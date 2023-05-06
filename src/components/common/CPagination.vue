<template>
  <div class="page">
    <el-pagination
      layout="total,sizes,prev, pager, next,jumper"
      :total="count"
      small
      background
      :currentPage="pageParams.offset"
      :pageSize="pageParams.limit"
      :page-sizes="[30, 60, 90]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const { count } = defineProps<{ count: number }>();
const emits = defineEmits(["sizeChange","currentChange"]);

const pageParams = reactive({
  offset: 0,
  limit: 30,
});

// 当前页改变的时候触发的事件
const handleCurrentChange = (val: number) => {
  pageParams.offset = val;
  emits("currentChange", val);
};
// 页数改变的时候触发的事件
const handleSizeChange = (val: number) => {
  pageParams.limit = val;
  emits("sizeChange", val);
};
</script>

<style lang="scss" scoped>
.page {
  margin: 15px 0;
  display: flex;
  justify-content: center;
}
</style>
