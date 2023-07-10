<template>
	<div class="music-player">
		<PlayerSong />
		<div class="player-m">
			<PlayerController />
			<PlayerSlier />
		</div>
		<PlayerAction />
	</div>
</template>

<script setup lang="ts">
import PlayerSong from './playerSong.vue';
import PlayerController from './playerController.vue';
import PlayerSlier from './playerSlier.vue';
import PlayerAction from './playerAction.vue';
import { userPlayerInit } from '@/store/player';

userPlayerInit();
</script>

<style lang="scss">
.music-player {
	width: 100%;
	height: 70px;
	background-color: #fff;
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.player-m {
		flex: 1;
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
