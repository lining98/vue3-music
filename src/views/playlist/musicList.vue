<template>
  <div style="height: 100%">
      <ul>
        <li v-for="(item, index) in musicArr" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// const msg = ref("音乐列表")
defineProps(["musicArr"]);
</script>

<style lang="scss" scoped></style>
