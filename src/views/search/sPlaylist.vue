<template>
	<div v-loading="loading">
		<div class="scount">
			共搜到<span>{{ dataList.playlistCount }}</span
			>个歌单
		</div>
		<ul class="sPlayList">
			<li v-for="item in dataList.playlists" :key="item.id">
				<div class="play"><IconPark :icon="Play" size="22" /></div>
				<div class="image">
					<el-image :src="item.coverImgUrl" lazy></el-image>
				</div>
				<div class="name">
					<a @click="router.push({ name: 'playlist', query: { id: item.id } })">{{ item.name }}</a>
				</div>
				<div class="count">
					<span>{{ item.trackCount }}首</span>by<span>{{ item.creator.nickname }}</span>
				</div>
				<div class="collect">收藏：{{ useNumberFormat(item.bookCount) }}</div>
				<div class="listenTo">收听：{{ useNumberFormat(item.playCount) }}</div>
			</li>
		</ul>
		<CPagination
			v-if="dataList.playlistCount > 30"
			:count="dataList.playlistCount"
			@sizeChange="handleChangePage"
			@currentChange="handleChangeCurrent"
		/>
	</div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CPagination from '@/components/common/CPagination.vue';
import IconPark from '@/components/common/IconPark.vue';
import { Play } from '@icon-park/vue-next';
import { useNumberFormat } from '@/utils/format';

const route = useRoute();
const router = useRouter();
const type = route.query.type;
import useSearchPage from './searchPage';
const { info, loading, dataList, getData } = useSearchPage();

const handleChangePage = (val: any) => {
	info.limit = val;
	getData(info.offset, info.limit, type);
};
const handleChangeCurrent = (val: any) => {
	info.offset = info.limit * (val - 1);
	getData(info.offset, info.limit, type);
};

watch(
	() => route.fullPath,
	() => {
		if (Number(route.query.type) == 1000) {
			getData(0, 30, 1000);
		}
	}
);
onMounted(() => {
	getData(0, 30, 1000);
});
</script>

<style lang="scss" scoped>
.sPlayList {
	li {
		padding: 5px 0;
		display: flex;
		align-items: center;
		border: 1px solid transparent;
		> div {
			margin: 0 10px;
		}
		.play {
			cursor: pointer;
			width: 22px;
			height: 22px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #b3b3b3;
			&:hover {
				color: #666;
			}
		}
		.image {
			width: 50px;
			height: 50px;
			border: 1px solid #d9d9d9;
		}
		.name {
			flex: 1;
			a:hover {
				cursor: pointer;
				text-decoration: underline;
			}
		}
		.count {
			width: 350px;
			span:nth-child(1) {
				color: #999;
				display: inline-block;
				width: 50px;
				text-align: right;
				margin-right: 15px;
			}
			span:nth-child(2) {
				color: #666;
				margin-left: 10px;
			}
		}
		.collect {
			width: 120px;
		}
		.listenTo {
			width: 120px;
		}
	}
	li:nth-child(2n) {
		background-color: #f7f7f7;
	}
	li:hover {
		border: 1px solid #e1e1e1;
		background-color: #f2f2f2;
	}
}
</style>
