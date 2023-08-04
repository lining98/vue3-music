# 云音乐

## 前言

首先还是得感谢 [网易云音乐 NodeJS 版 API](https://binaryify.github.io/NeteaseCloudMusicApi/#/) 提供的 API 练手，给予了学习的机会。

为了探索最前沿的前端技术栈, 一切为了好玩, 觉得喜欢的可以点个 star。

## 技术栈

​ 本项目由 vite、vue3、pinia、ts、element-plus 写的一个音乐网站，实现了网易云音乐的主要功能。页面的样式布局整体采用的是 flex 弹性布局，使用 scss CSS 预编译器用作 CSS 编码。

访问地址： [云音乐](http://121.40.174.152/#/discover/recommend)

## 本地部署本项目

- 安装

```sh
npm install
#或者
yarn
```

- 运行

```sh
npm run serve
yarn serve
```

## 功能介绍

### 菜单

#### 发现音乐(主页)

- 个性推荐 （推荐歌单）
- 排行榜
- 歌单 （歌单分类/多标签分类）
- 歌手（歌手分类、热门歌手）

#### 动态

- 视频分类
- MV 展示列表

#### MV 视频

- 视频分类（需要登录）
- MV 展示列表

#### 每日推荐

- 每日推荐歌曲歌单（需要登录）

#### 我的收藏

- 关注的歌手
- 收藏的歌单
- 收藏的视频
-

#### 最近播放

- 最近播放——歌曲
- 最近播放——专辑
- 最近播放——歌单
- 最近播放——视频

#### 登录模块

- 密码登录（官方禁止）
- 自动生成二维码扫码登录 （实时刷新二维码）

- cookie 本地保存登录 token 记录，下次打开不用重新登录

#### 搜索模块

- 搜索歌曲
- 搜索歌单专辑
- 搜索歌手
- 搜索视频
- 搜索歌词

#### 播放模块（技术难点）

- 歌曲播放时间绑定，随意拖拽进度条
- 音量控制
- 播放模式（随机，顺序，单曲循环）
- 播放列表
- 喜欢/取消喜欢 音乐

### 分页

#### 歌曲详情页(技术难点)

- 歌词滚动
- 唱片旋转
- 最新热评

#### 歌单详情页

- 播放、收藏 交互设计
- 歌单评论
- 歌单歌曲列表
- 歌单介绍
- 喜欢/取消喜欢 音乐

#### 专辑详情页

- 同歌单详情页

#### 排行榜单详情页

- 同歌单详情页

#### 歌手详情页

- 热门歌曲
- 专辑
- 歌手自己 MV
- 歌手描述

#### MV 详情页

- MV 播放
- 相关 MV 推荐列表
- 评论

#### 评论模块

- 热门评论
- 最新评论
- 发送评论
- 删除自己评论
- 点赞/取消 评论


### 其他功能
- 封装公共组件
- 分页
- 滚动条到底自动更新数据
