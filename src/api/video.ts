import axios from "@/http/request";


/* 视频 */
// 获取视频标签列表 /video/group/list
export const videoGroupList = () => axios.get("/video/group/list");

// 获取视频分类列表 /video/category/list
export const videoCategoryList = () => axios.get("/video/category/list");

// 获取视频标签/分类下的视频 /video/group?id=xxxx
export const videoGroupById = (id:number) => axios.get(`/video/group?id=${id}`);