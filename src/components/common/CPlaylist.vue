<template>
	<!-- 封装歌单列表显示 -->
	<div class="playlists">
		<div
			class="item"
			v-for="item in playlists"
			:key="item.data?.id || item.id"
			@click="router.push({ name: 'playlist', query: { id: item.data?.id || item.id } })"
		>
			<el-card shadow="hover" :body-style="{ padding: '0.5rem' }">
				<div class="img">
					<img :src="item.picUrl || item.coverImgUrl || item.data?.coverImgUrl" />
					<div class="playCount" v-if="item.playcount">
						<IconPark :icon="Headset" />
						<span>{{ useNumberFormat(item.playcount) }}</span>
					</div>
				</div>
				<div class="name">
					<p class="ellipsis">{{ item.data?.name || item.name }}</p>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Headset } from '@icon-park/vue-next';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useNumberFormat } from '@/utils/format';
const router = useRouter();
const { playlists } = defineProps(['playlists']);
</script>

<style lang="scss" scoped>
.playlists {
	display: grid;
	// 每行5个
	grid-template-columns: repeat(5, 1fr);

	.item {
		width: 16rem;
		margin: 1rem 0.5rem;
		cursor: pointer;

		.img {
			position: relative;
			.playCount {
				width: 100%;
				height: 25px;
				position: absolute;
				bottom: 5px;
				background-color: rgba($color: #000000, $alpha: 0.3);
				color: #f0f0f0;
				padding-left: 6px;
				display: flex;
				align-items: center;
			}
		}

		span {
			display: block;
			height: auto;
			text-align: center;
			font-size: 13px;
		}
	}
}
</style>
