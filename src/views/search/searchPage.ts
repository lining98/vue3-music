import { ref, reactive } from 'vue';
import { getSearchResult } from '@/api/api';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '@/store/search';

function useSearchPage() {
	const dataList: any = ref({});
	const loading = ref(true);
	const info = reactive({
		offset: 1,
		limit: 30,
	});

	const { keywords } = storeToRefs(useSearchStore());
	const getData = async (offset: number, limit: number, type: any) => {
		loading.value = true;
		dataList.value = await getSearchResult({
			keywords: keywords.value,
			type: type,
			offset: offset,
			limit: limit,
		});
		loading.value = false;
	};

	return {
		dataList,
		loading,
		info,
		getData,
	};
}

export default useSearchPage;
