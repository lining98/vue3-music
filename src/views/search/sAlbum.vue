<template>
	<div v-loading="loading">
		<div class="scount">
			共搜到<span>{{ dataList.albumCount }}</span
			>张专辑
		</div>
		<CAlbum :albumlist="dataList.albums" />
		<CPagination
			v-if="dataList.albumCount > 30"
			:count="dataList.albumCount"
			@sizeChange="handleChangePage"
			@currentChange="handleChangeCurrent"
		/>
	</div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import CPagination from '@/components/common/CPagination.vue';

const route = useRoute();
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
		if (Number(route.query.type) == 10) {
			getData(0, 30, 10);
		}
	}
);
onMounted(() => {
	getData(0, 30, 10);
});
</script>

<style lang="scss" scoped></style>
