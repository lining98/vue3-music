<template>
	<div class="result">
		<span class="res">{{ keywords }}</span
		>的搜索结果
	</div>
	<ul class="nav">
		<li v-for="item in taps" key="item.name">
			<router-link :to="item.path">{{ item.label }}</router-link>
		</li>
	</ul>
	<router-view></router-view>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/store/search';
import { storeToRefs } from 'pinia';

const { keywords } = storeToRefs(useSearchStore());
const taps = [
	{
		label: '单曲',
		path: `/search/song?keywords=${keywords.value}&type=1`,
		name: 'searchSong',
	},
	{
		label: '歌手',
		path: `/search/artist?keywords=${keywords.value}&type=100`,
		name: 'searchArtist',
	},
	{
		label: '专辑',
		path: `/search/album?keywords=${keywords.value}&type=10`,
		name: 'searchAlbum',
	},
	{
		label: '歌单',
		path: `/search/playlist?keywords=${keywords.value}&type=1000`,
		name: 'searchPlaylist',
	},
	{
		label: '视频',
		path: `/search/video?keywords=${keywords.value}&type=1014`,
		name: 'searchVideo',
	},
	{
		label: '歌词',
		path: `/search/lyric?keywords=${keywords.value}&type=1006`,
		name: 'searchLyric',
	},
];

// const handleClick = (tab: TabsPaneContext) => {
//   router.push(`${tab.paneName}`)
// }
</script>

<style lang="scss" scoped>
.result {
	width: 300px;
	border: 1px solid #34d399;
	padding: 5px 0;
	text-align: center;
	margin: 0 auto 10px;
	border-radius: 5px;
	font-size: 22px;
	.res {
		margin-right: 5px;
		font-weight: bold;
		color: #34d399;
	}
}
.nav {
	display: flex;
	margin-bottom: 15px;
	li {
		width: 100px;
		height: 40px;
		text-align: center;
		background-color: #f7f7f7;
		> a {
			box-sizing: border-box;
			display: block;
			width: 100%;
			height: 100%;
			line-height: 40px;
			border-top: 2px solid #ccc;
			border-bottom: 1px solid #ccc;
		}
		> a:hover {
			border-top: 2px solid #34d399 !important;
		}
	}
	li:first-child {
		border-left: 1px solid #ccc;
	}
	li:last-child {
		border-right: 1px solid #ccc;
	}
}
.active {
	background: linear-gradient(#e3e3e3, #fff 80%);
	border-top: 2px solid #34d399 !important;
	border-bottom: 1px solid #fff !important;
}
</style>

<style lang="scss">
.scount {
	font-size: 12px;
	span {
		color: #c20c0c;
		margin: 0 3px;
	}
}
</style>
