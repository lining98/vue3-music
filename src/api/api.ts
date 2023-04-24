import axios from "@/utils/request";
import { IBanner } from "@/models/banner";
import { ISongUrl } from "@/models/songUrl";
import { ISongDetail } from "@/models/song";
import { ISearchHotDetail, ISearchSuggest } from "@/models/search";
import { IUserPlaylist } from "@/models/userPlaylist";

// 轮播
export async function getBanner() {
  const { banners } = await axios.get<{ banners: IBanner }>("/banner", {
    type: 0,
  });
  return banners;
}

// 获取音乐地址
export async function getSongUrl(id: number) {
  const { data } = await axios.get<{ data: ISongUrl }>("/song/url", { id: id });
  return data[0];
}

// 获取音乐详情
export async function getSongDetail(id: number) {
  const { songs } = await axios.get<{ songs: ISongDetail }>("/song/detail", {
    ids: id,
  });
  return songs[0];
}

// 获取热门搜索 /search/hot/detail
export async function getSearchHotDetail() {
  const { data } = await axios.get<{ data: ISearchHotDetail[] }>(
    "/search/hot/detail"
  );
  return data;
}
// 获取搜索建议 /search/suggest?keywords=xxx
export async function getSearchSuggest(keywords: string) {
  const { result } = await axios.get<{ result: ISearchSuggest }>(
    "/search/suggest",
    {
      keywords: keywords,
    }
  );
  return result;
}


// 歌单
// 获取用户歌单 /user/playlist?uid
export async function getUserPlaylist(uid: number) {
  const { playlist } = await axios.get<{ playlist: IUserPlaylist }>(
    "/user/playlist",
    {
      uid: uid,
    }
  );
  return playlist;
}

// 获取歌单详情 /playlist/detail?id=
export const getPlaylistDetail = (id: number) =>
  axios.get(`/playlist/detail?id=${id}`);
// export async function getPlaylistDetail(id:number) {
//   const { playlist } = await axios.get("/user/playlist",{
//     id:id
//   });
//   return playlist;
// }

// 获取歌单所有歌曲 /playlist/track/all?id=xxx&limit=10&offset=1
export const getPlaylistTrackAll = (id: number) =>
  axios.get(`/playlist/track/all?id=${id}`);


// 歌手
// 获取歌手详情 /artist/detail?id=xx  id:歌手id
export const getArtistDetail = (id: number) =>
  axios.get(`/artist/detail?id=${id}`);

// 获取歌手单曲 /artists?id=xxx  id:歌手id
export const getArtists = (id: number) => axios.get(`/artist?id=${id}`);
// 获取歌手专辑 /artist/album?id=xxx&limit=5  id:歌手id  可选参数 : limit: 取出数量 , 默认为 30
export const getArtistAlbum = (id: number) => axios.get(`/artist/album?id=${id}`);
// 获取歌手mv /artist/mv?id=xxx  id:歌手id
export const getArtistMv = (id: number) => axios.get(`/artist/mv?id=${id}`);
// 获取歌手描述 /artist/desc?id=xx  id:歌手id
export const getArtistDesc = (id: number) => axios.get(`/artist/desc?id=${id}`);

// 歌手热门 50 首歌曲  /artist/top/song?id=xxx
export const getArtistTopSong = (id: number) => axios.get(`/artist/top/song?id=${id}`);
// 歌手全部歌曲  /artist/songs?id=xxx
export const getArtistSongs = (id: number) => axios.get(`/artist/songs?id=${id}`);


// 获取喜欢音乐列表
export const getLikelist = (id:number) => axios.get(`/likelist?uid=${id}`)


// 获取专辑内容
export const getAlbumDetail = (id:number) => axios.get(`/album?id=${id}`)
