import { defineStore } from 'pinia';
import { IUserPlaylist } from '@/models/userPlaylist';
import { getLikelist, getUserPlaylist, likeSong } from '@/api/api';
import { ElMessage } from 'element-plus';

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			userId: 0,
			likes: [],
			token: '',
			cookie: '',
			showLogin: false,
			profile: {},
			playlist: {} as IUserPlaylist,
		};
	},
	getters: {
		isLogin: (state: any) => {
			return state.profile?.userId > 0;
		},
	},
	actions: {
		// 获取我的歌单
		async getPlaylist(userId: number) {
			this.playlist = await getUserPlaylist(userId);
		},

		// 获取喜欢音乐列表
		async getLikeList(userId: number) {
			const { code, ids } = await getLikelist(userId);
			if (code == 200) {
				this.likes = ids;
			} else {
				ElMessage.error('登录过期，请重新登录！');
			}
		},

		// 喜欢音乐
		async LikeSong(id: number) {
			let isLike = this.likes.indexOf(id) == -1;
			let msg = isLike ? '喜欢歌曲' : '取消喜欢';
			const res: any = await likeSong(id, isLike);
			if (res.code === 200) {
				ElMessage.success(msg);
				this.getLikeList(this.userId);
				this.getPlaylist(this.userId);
			} else if (res.code === 405) {
				ElMessage.error(res.message);
			} else {
				ElMessage.error(res.message);
			}
		},
	},
});
