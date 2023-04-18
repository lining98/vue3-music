<template>
  <div class="text">
    <template v-if="show">
      <span v-if="!isShow">{{ text.substring(0, end) }}...</span>
      <span v-else>{{ text }}</span>
      <span class="btn" @click="isShow = !isShow"
        >[{{ isShow ? "收起" : "详情" }}]</span
      >
    </template>
    <template v-else>{{ text }}</template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ text: string; end: number }>();

const show = ref(false);
const isShow = ref(false);


if (props.text && props.text.length > props.end) {
  show.value = true;
}
console.log(props.text.length,props.end);
console.log(show.value);

</script>

<style lang="scss" scoped>
.text {
  .btn {
    cursor: pointer;
    color: #34d399;
  }
  .btn:hover {
    color: #02bf7a;
  }
}
</style>
