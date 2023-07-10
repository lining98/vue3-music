<template>
	<ul class="nav">
		<li v-for="item in navList" :key="item.name">
			<router-link :to="{ name: item.name }" exact :exact-active-class="'actived'">{{ item.label }}</router-link>
		</li>
	</ul>
	<router-view></router-view>
</template>

<script setup lang="ts">
const navList = [
	{ label: '视频', name: 'videoList' },
	{ label: 'MV', name: 'mvList' },
];
</script>
