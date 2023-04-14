<script setup lang="ts">
// import {Camera} from '@icon-park/vue-next'
const { icon, size, fill } = defineProps<{
  icon?: any;
  size?: number | string;
  fill?: string | string[];
}>();
</script>

<template>
  <!-- <Camera size='32' fill='#f60' /> 例子 -->
  <Component :is="icon" :size="size" :fill="fill" />
</template>

<style lang="" scoped></style>
