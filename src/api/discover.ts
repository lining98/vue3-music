import axios from "@/http/request";

// 获取推荐歌单
export const getGersonalized = () => axios.get("/personalized");

/* 个性推荐 */
// 获取推荐歌曲
export const recommendSongs = () => axios.get("/recommend/songs");

// 获取排行榜详情
export const getToplistDetail = () => axios.get("/toplist/detail");

/* 歌单 */
// 歌单分类 /playlist/catlist
export const getPlaylistCatlist = () => axios.get("/playlist/catlist");
// 热门歌单分类 /playlist/hot
export const getPlaylistHot = () => axios.get("/playlist/hot");
// 歌单 /top/playlist cat: tag, 比如 " 华语 "、" 古风 " limit 数量  offset 偏移数量 , 用于分页
export const getHotPlaylist = (params: any) =>  axios.get("/top/playlist", params);
