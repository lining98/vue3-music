<template>
	<ul class="select" v-for="item in category" :key="item.key">
		<li>{{ item.name }}</li>
		<li
			v-for="cat in item.child"
			:key="cat.key"
			:class="params[item.key] == cat.key ? 'active' : ''"
			@click="optionChange(cat.key, item.key)"
		>
			{{ cat.name }}
		</li>
	</ul>
	<div
		class="mv"
		v-infinite-scroll="load"
		:infinite-scroll-delay="500"
		:infinite-scroll-distance="300"
		:infinite-scroll-immediate="false"
	>
		<Videos :videos="mvlist" :isMv="true" :loading="loading" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { staticMVCategory } from '@/utils/useStaticData';
import { getMVAll } from '@/api/video';
import Videos from '../component/videos.vue';

const category = staticMVCategory;

const loading = ref(false);
const mvlist = ref([]);
const params = reactive({
	area: '全部',
	type: '全部',
	order: '上升最快',
	page: 1,
	offset: 0,
	limit: 24,
});

const getData = async () => {
	params.offset = (params.page - 1) * 24;
	try {
		const { data } = await getMVAll(params);
		if (params.page === 1) {
			mvlist.value = data;
		} else {
			mvlist.value.push(...data);
		}
	} catch (e) {
		params.page--;
	}
};

const optionChange = (key: number | string, option: string) => {
	params.page = 1;
	//   console.log(key, option);
	if (option == 'area') params.area = key as string;
	if (option == 'type') params.type = key as string;
	if (option == 'order') params.order = key as string;

	getData();
};

const load = () => {
	params.page++;
	getData();
};

onMounted(() => {
	getData();
});
</script>

<style lang="scss" scoped></style>
