import axios from '@/utils/request';

/* 评论接口 */

/*
必选参数 :
    id : 资源 id
    type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
    0: 歌曲
    1: mv
    2: 歌单
    3: 专辑
    4: 电台节目
    5: 视频
    6: 动态
    7: 电台
*/

/*
可选参数 ：
limit: 取出评论数量 , 默认为 20
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
*/
// 热门评论
export const getCommentHot = (data: any) => axios.get('/comment/hot', data);

/*
可选参数 :
    pageNo:分页参数,第 N 页,默认为 1
    pageSize:分页参数,每页多少条数据,默认 20
    sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
    cursor: 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
*/
// 新版评论接口
export const getCommentNew = (data: any) => axios.get('/comment/new', data);

// 给评论点赞
// 说明 : 调用此接口 , 传入 type, 资源 id, 和评论 id cid 和 是否点赞参数 t 即可给对 应评论点赞 ( 需要登录 )
export const getCommentLike = (data: any) => axios.get('/comment/like', data);

// 发布/删除 评论
export const comment = (data: any) => axios.get('/comment', data);

/*
// 歌曲评论
export const getCommentMusic = (data:any)=> axios.get('/comment/music',data)

// 专辑评论
export const getCommentAlbum = (data:any)=> axios.get('/comment/album',data)

// 歌单评论
export const getCommentPlaylist = (data:any)=> axios.get('/comment/playlist',data)

// 视频评论
export const getCommentVideo = (data:any)=> axios.get('/comment/video',data)

// mv评论
export const getCommentMV = (data:any)=> axios.get('/comment/mv',data) */
