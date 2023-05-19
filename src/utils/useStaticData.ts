// 歌手分类 字段和key值  映射表
export const staticSingerCategory = [
  // 地区分类
  {
    name: "语种",
    key: "area",
    child: [
      { key: -1, name: "全部" },
      { key: 7, name: "华语" },
      { key: 96, name: "欧美" },
      { key: 8, name: "日本" },
      { key: 16, name: "韩国" },
      { key: 0, name: "其他" },
    ],
  },
  // 类型分类
  {
    name: "分类",
    key: "type",
    child: [
      { key: -1, name: "全部" },
      { key: 1, name: "男歌手" },
      { key: 2, name: "女歌手" },
      { key: 3, name: "乐队" },
    ],
  },
  // 首字母分类
  {
    name: "筛选",
    key: "initial",
    child: [
      { key: "-1", name: "热门" },
      { key: "a", name: "A" },
      { key: "b", name: "B" },
      { key: "c", name: "C" },
      { key: "d", name: "D" },
      { key: "e", name: "E" },
      { key: "f", name: "F" },
      { key: "g", name: "G" },
      { key: "h", name: "H" },
      { key: "i", name: "I" },
      { key: "j", name: "J" },
      { key: "k", name: "K" },
      { key: "l", name: "L" },
      { key: "m", name: "M" },
      { key: "n", name: "N" },
      { key: "o", name: "O" },
      { key: "p", name: "P" },
      { key: "q", name: "Q" },
      { key: "r", name: "R" },
      { key: "s", name: "S" },
      { key: "t", name: "T" },
      { key: "u", name: "U" },
      { key: "v", name: "V" },
      { key: "w", name: "W" },
      { key: "x", name: "X" },
      { key: "y", name: "Y" },
      { key: "z", name: "Z" },
      { key: "0", name: "#" },
    ],
  },
];


// MV分类 字段和key值  映射表
export const staticMVCategory = [
  // 地区分类
  {
    name: "地区",
    key: "area",
    child: [
      { key: "全部", name: "全部" },
      { key: "内地", name: "内地" },
      { key: "港台", name: "港台" },
      { key: "欧美", name: "欧美" },
      { key: "日本", name: "日本" },
      { key: "韩国", name: "韩国" },
    ],
  },
  // 类型分类
  {
    name: "类型",
    key: "type",
    child: [
      { key: "全部" , name: "全部" },
      { key: "官方版" , name: "官方版" },
      { key: "原生" , name: "原生" },
      { key: "现场版" , name: "现场版" },
      { key: "网易出品" , name: "网易出品" },
    ],
  },
  // 排序
  {
    name: "排序",
    key: "order",
    child: [
      { key: "上升最快", name: "上升最快" },
      { key: "最热", name: "最热" },
      { key: "最新", name: "最新" },
    ],
  },
];
