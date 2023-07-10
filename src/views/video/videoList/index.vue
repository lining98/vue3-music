<template>
	<div v-if="isLogin">
		<CategoryList :category="category" :group="group" />
		<div
			class="videos"
			v-infinite-scroll="load"
			:infinite-scroll-delay="500"
			:infinite-scroll-distance="300"
			:infinite-scroll-immediate="false"
		>
			<Videos :videos="videos" :isMv="false" :loading="loading" />
		</div>
	</div>
	<el-empty v-else description="该页面需要登录才能访问"></el-empty>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getVideoGroupList, getVideoCategoryList } from '@/api/video';
import { storeToRefs } from 'pinia';
import { useVideoStore } from '@/store/video';
import CategoryList from '../videoList/categoryList.vue';
import Videos from '../component/videos.vue';

const { cat, catId, videos, loading, time } = storeToRefs(useVideoStore());
const { getMoreVideos } = useVideoStore();

const category = ref([]);
const group = ref([]);

const isLogin: boolean = Boolean(localStorage.getItem('cookie'));

const getData = async () => {
	time.value = 0;
	const categoryData: any = await getVideoGroupList();
	category.value = categoryData.data;
	const groupData: any = await getVideoCategoryList();
	group.value = groupData.data;
	cat.value = category.value[0].name;
	catId.value = category.value[0].id;
	loading.value = true;
	getMoreVideos();
	loading.value = false;
};

const load = () => {
	getMoreVideos();
};

onMounted(() => {
	if (isLogin) {
		getData();
	}
});
</script>

<style lang="scss" scoped>
.videos {
	min-height: 1080px;
}
</style>
