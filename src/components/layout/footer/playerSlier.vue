<template>
	<div class="slider">
		<el-slider
			v-model="currentTime"
			:show-tooltip="false"
			:disabled="currentTime == 0"
			:min="0"
			:max="duration"
			@change="onSliderChange"
			@input="onSliderInput"
		/>
	</div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { usePlayerStore } from '@/store/player';

const { duration, currentTime, onSliderChange, onSliderInput } = toRefs(usePlayerStore());
</script>

<style lang="scss" scoped>
.slider {
	width: 100%;
	box-sizing: border-box;
	padding: 0 30px;
	position: absolute;
	top: -20px;
}
</style>
