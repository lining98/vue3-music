<template>
	<div class="suggest" v-if="suggestData" v-for="order in suggestData.order">
		<!-- 搜索出来的列表 -->
		<div class="title">{{ getTitle(order) }}</div>
		<!-- 单曲 -->
		<ul class="list" v-if="order === 'songs'">
			<li class="songs" v-for="item in suggestData.songs" :key="item.id" @click="play(item.id)">
				<p class="ellipsis">
					<span class="name">{{ item.name }}</span>
					<span class="line">-</span>
					<span class="artist">{{ head(item.artists)?.name }}</span>
				</p>
			</li>
		</ul>
		<!-- 歌手 -->
		<ul class="list" v-if="order === 'artists'">
			<li v-for="item in suggestData.artists" :key="item.id" @click="routerPush('artistDetail', item.id)">
				<el-avatar :src="item.picUrl" />
				<span class="name">{{ item.name }}</span>
			</li>
		</ul>
		<!-- 专辑 -->
		<ul class="list" v-if="order === 'albums'">
			<li v-for="item in suggestData.albums" :key="item.id" @click="routerPush('albumDetail', item.id)">
				<span class="name">{{ item.name }}</span>
				<span class="line">-</span>
				<span class="artist">{{ item.artist.name }}</span>
			</li>
		</ul>
		<!-- 歌单 -->
		<ul class="list" v-if="order === 'playlists'">
			<li v-for="item in suggestData.playlists" :key="item.id" @click="routerPush('playlist', item.id)">
				<span class="name">{{ item.name }}</span>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { head } from 'lodash';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/store/search';
import { usePlayerStore } from '@/store/player';
import { useRouter } from 'vue-router';

const { suggestData } = storeToRefs(useSearchStore());

const { play } = usePlayerStore();
const router = useRouter();

const routerPush = (name: string, id: number) => {
	router.push({ name: name, query: { id: id } });
};

const getTitle = (name: string) => {
	switch (name) {
		case 'songs':
			return '单曲';
		case 'artists':
			return '歌手';
		case 'albums':
			return '专辑';
		case 'playlists':
			return '歌单';
		default:
			return name;
	}
};
</script>

<style lang="scss" scoped>
.suggest {
	.title {
		height: 40px;
		line-height: 40px;
		color: #999;
	}
	.list {
		li {
			display: flex;
			align-items: center;
			height: 30px;
			cursor: pointer;
			.line {
				margin: 0 5px;
			}
			.name {
				margin-left: 10px;
			}
			.music {
				color: #333;
			}
			.artist {
				color: #507daf;
			}
		}

		li:hover {
			background: #e5e7eb;
		}
	}
}
</style>
