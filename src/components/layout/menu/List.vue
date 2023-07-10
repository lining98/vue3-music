<template>
	<ul>
		<li
			v-for="item in props.playlist"
			:key="item.id"
			@click="toPlaylist(item.id)"
			:class="item.id == route.query.id && route.name == 'playlist' ? 'actived' : ''"
		>
			<div class="list" v-if="subscribed ? item.subscribed : !item.subscribed">
				<el-image lazy :src="item.coverImgUrl" alt="" class="img"></el-image>
				<div class="title">
					<p class="name">{{ item.name }}</p>
					<span>{{ item.trackCount }}首</span>
				</div>
			</div>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const props = defineProps(['playlist', 'subscribed']);

const toPlaylist = (id: number) => {
	router.push({
		name: 'playlist',
		query: { id: id },
	});
};
</script>

<style lang="scss" scoped>
ul {
	.list {
		height: 54px;
		display: flex;
		align-items: center;
		padding-left: 8px;
		cursor: pointer;
		.img {
			width: 45px;
			margin-right: 5px;
		}
		.title {
			width: 100%;
			display: flex;
			flex-direction: column;
			p.name {
				width: 185px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
	li:hover:not(li.actived) {
		background: #f4f2f2;
	}
	.actived {
		background-color: #e6e6e6;
	}
}
</style>
