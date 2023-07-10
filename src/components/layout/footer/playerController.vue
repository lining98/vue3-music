<template>
	<div class="player-controller">
		<!-- 播放顺序 -->
		<IconPark :icon="loopType === 0 ? ShuffleOne : loopType === 1 ? PlayOnce : LoopOnce" size="18" @click="toggleLoop" />
		<!-- 上一首 -->
		<IconPark :icon="GoStart" @click="prev" size="24" />
		<!-- 播放键 -->
		<IconPark
			:icon="isPause ? PauseOne : Play"
			size="45"
			theme="filled"
			fill="#39c6ad"
			class="player-btn"
			@click="togglePlay"
		/>
		<!-- 下一首 -->
		<IconPark :icon="GoEnd" @click="next" size="24" />
		<!-- 喜欢 -->
		<IconPark class="icon-like" :class="likes.indexOf(id) !== -1 ? 'like' : ''" :icon="Like" @click="like" size="20" />
	</div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/store/player';
import { useUserStore } from '@/store/user';
import { likeSong } from '@/api/api';
import { Play, GoStart, PauseOne, GoEnd, PlayOnce, LoopOnce, ShuffleOne, Like } from '@icon-park/vue-next';
import { onMounted, ref, toRefs, watch } from 'vue';

import IconPark from '@/components/common/IconPark.vue';
import { ElMessage } from 'element-plus';

const { likes } = toRefs(useUserStore());
const { id, title, isPause, loopType, togglePlay, toggleLoop, next, prev } = toRefs(usePlayerStore());

const { getLikeList } = useUserStore();

const userId = JSON.parse(localStorage.getItem('USER'))?.userId || 0;

const like = async () => {
	let isLike = likes.value.indexOf(id.value) == -1;
	let msg = isLike ? '喜欢歌曲' : '取消喜欢';
	await likeSong(id.value, isLike);
	getLikeList(userId);
	ElMessage.success(msg);
};

watch(title, (val) => {
	document.title = val + ' | 云音乐';
});
watch(isPause, (bool) => {
	document.title = bool ? title.value + ' | 云音乐' : '云音乐';
});

onMounted(() => {
	if (userId) {
		getLikeList(userId);
	}
});
</script>

<style lang="scss" scoped>
.player-controller {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	column-gap: 18px;
	.i-icon:hover:not(.icon-like) {
		cursor: pointer;
		color: #39c6ad;
	}
	.like {
		color: red;
	}
}
</style>
