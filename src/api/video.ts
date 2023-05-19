import axios from "@/http/request";


/* 视频 */
// 获取视频标签列表 /video/group/list
export const getVideoGroupList = () => axios.get("/video/group/list");

// 获取视频分类列表 /video/category/list
export const getVideoCategoryList = () => axios.get("/video/category/list");

// 获取视频标签/分类下的视频 /video/group?id=xxxx
export const getVideoGroupById = (id:number,offset:number) => axios.get(`/video/group?id=${id}&offset=${offset}`);

// 获取全部MV /mv/all
/* 可选参数
area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
limit: 取出数量 , 默认为 30
offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 */

export const getMVAll = (params:any) =>  axios.get("/mv/all", params);