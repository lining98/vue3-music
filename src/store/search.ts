import {defineStore} from 'pinia'
import {getSearchSuggest} from '@/utils/api'
import type {ISearchSuggest} from '@/models/search'

export const useSearchStore = defineStore("search",{
    state:()=>{
        return{
            showSearchView:false,
            searchKeyword:'',
            suggestData:{} as ISearchSuggest,
        }
    },
    getters:{
        showHot:state=>{
            return state.searchKeyword == ''
        }
    },
    actions:{
        async suggest(){
            this.suggestData = await getSearchSuggest(this.searchKeyword)
        }
    }
})