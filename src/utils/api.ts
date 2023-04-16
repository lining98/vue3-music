import http from "./http";
import { IBanner } from "@/models/banner";
import { ISongUrl } from "@/models/songUrl";
import { ISongDetail } from "@/models/song";
import { ISearchHotDetail, ISearchSuggest } from "@/models/search";

// 轮播
export async function getBanner() {
  const { banners } = await http.get<{ banners: IBanner }>("/banner", {
    type: 0,
  });
  return banners;
}

// 获取音乐地址
export async function getSongUrl(id: number) {
  const { data } = await http.get<{ data: ISongUrl }>("/song/url", { id: id });
  return data[0];
}

// 获取音乐详情
export async function getSongDetail(id: number) {
  const { songs } = await http.get<{ songs: ISongDetail }>("/song/detail", {
    ids: id,
  });
  return songs[0];
}

// 获取热门搜索 /search/hot/detail
export async function getSearchHotDetail() {
  const { data } = await http.get<{ data: ISearchHotDetail[] }>("/search/hot/detail");
  return data;
}
// 获取搜索建议 /search/suggest?keywords=xxx
export async function getSearchSuggest(keywords:string) {
  const { result } = await http.get<{ result: ISearchSuggest }>("/search/suggest",{
    keywords:keywords
  });
  return result;
}
