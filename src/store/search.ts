import { defineStore } from "pinia";
import { getSearchSuggest } from "@/api/api";
import type { ISearchSuggest } from "@/models/search";

export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      keywords:localStorage.getItem('keywords'),
      showSearchView: false,
      searchKeyword: "",
      suggestData: {} as ISearchSuggest,

      result:{},

      ssongsDetial:{},
      sArtistsDetial:{},
      sAlbumsDetial:{},
      sPlaylistsDetial:{},
      sVideosDetial:{},
      sLyricDetial:{},

    };
  },
  getters: {
    showHot: (state) => {
      return state.searchKeyword == "";
    },
  },
  actions: {
    async suggest() {
      this.suggestData = await getSearchSuggest(this.searchKeyword);
    },
  },
});
