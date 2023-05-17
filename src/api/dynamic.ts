import axios from "@/http/request";

/* 动态页面的接口 */

// 获取动态信息
export const getEvent = (pagesize:number = 20,lasttime?:number) => axios.get(`/event/pagesize=${pagesize}&lasttime=${lasttime}`)