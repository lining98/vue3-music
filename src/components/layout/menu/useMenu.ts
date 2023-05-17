import { Camera, Music, VideoOne, ThumbsUp } from "@icon-park/vue-next"; // 引入字体图表

interface IMenus {
  name: string;
  menus: IMenu[];
}
interface IMenu {
  name: string;
  key: string;
  icon?: any; // 可选属性
}

export function useMenu() {
  const menus: IMenus[] = [
    {
      name: "在线音乐",
      menus: [
        {
          name: "发现音乐",
          key: "recommendation",
          icon: Camera,
        },
        {
          name: "动态",
          key: "dynamic",
          icon: Music,
        },
        {
          name: "视频",
          key: "video",
          icon: VideoOne,
        },
        {
          name: "每日推荐",
          key: "recommend",
          icon: ThumbsUp,
        },
      ],
    },
  ];
  return {
    menus,
  };
}
