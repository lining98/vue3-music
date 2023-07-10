import { Camera, Music, VideoOne, ThumbsUp } from '@icon-park/vue-next'; // 引入字体图表

interface IMenus {
	title: string;
	menus: IMenu[];
}
interface IMenu {
	title: string;
	name: string;
	key: string;
	icon?: any; // 可选属性
}

export function useMenu() {
	const menus: IMenus[] = [
		{
			title: '在线音乐',
			menus: [
				{
					title: '发现音乐',
					name: 'recommend',
					key: 'discover',
					icon: Camera,
				},
				{
					title: '动态',
					name: 'dynamic',
					key: 'dynamic',
					icon: Music,
				},
				{
					title: '视频',
					name: 'video',
					key: 'video',
					icon: VideoOne,
				},
				{
					title: '每日推荐',
					name: 'recommendation',
					key: 'recommendation',
					icon: ThumbsUp,
				},
			],
		},
	];
	return {
		menus,
	};
}
