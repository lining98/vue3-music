import axios from '@/utils/request';

/* 最近播放 */

// 最近播放的——歌曲
export const getRecentSong = () => axios.get('/record/recent/song');

// 最近播放的——专辑
export const getRecentAlbum = () => axios.get('/record/recent/album');

// 最近播放的——歌单
export const getRecentPlaylist = () => axios.get('/record/recent/playlist');

// 最近播放的——视频
export const getRecentVideo = () => axios.get('/record/recent/video');
