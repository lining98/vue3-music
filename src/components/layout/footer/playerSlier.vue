<script setup lang="ts">
import { ref, reactive } from "vue";

const value1 = ref(0);
</script>

<template>
  <div>
    <el-slider v-model="value1" />
  </div>
</template>

<style lang="" scoped></style>
