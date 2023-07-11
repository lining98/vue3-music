<template>
	<div class="cat">
		<Catlist />
		<HotPlaylist />
	</div>
	<div class="playlists">
		<PlayList />
	</div>
</template>

<script setup lang="ts">
import Catlist from './catlist.vue';
import HotPlaylist from './hotPlaylist.vue';
import PlayList from './playList.vue';
</script>

<style lang="scss" scoped>
.cat {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
