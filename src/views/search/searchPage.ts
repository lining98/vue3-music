import { ref, watch, reactive, onMounted } from "vue";
import { getSearchResult } from "@/api/api";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/store/search";

function useSearchPage() {
  const dataList = ref({});
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
    })
    loading.value = false;
  };

//   const handleChangePage = (val: any,type:number) => {
//     info.limit = val;
//     getData(info.offset, info.limit, type);
//   };
//   const handleChangeCurrent = (val: any,type:number) => {
//     info.offset = info.limit * (val - 1);
//     getData(info.offset, info.limit, type);
//   };

  return {
    dataList,
    loading,
    info,
    getData,
    // handleChangePage,
    // handleChangeCurrent,
  };
}

export default useSearchPage;
