import axios from '@/utils/request';

/* 收藏 */

// 收藏的歌手
export const getArtistSublist = () => axios.get('/artist/sublist');

// 收藏的专辑
export const getAlbumSublist = () => axios.get('/album/sublist');

// 收藏的视频
export const getMVSublist = () => axios.get('/mv/sublist');
