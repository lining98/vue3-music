<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { userPlayerInit } from "@/store/player";

userPlayerInit();
</script>
