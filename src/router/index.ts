import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/layout/Layout.vue"),
    children: [
      {
        path: "/",
        redirect: "/findMusic",
      },
      {
        path: "findMusic",
        name: "findMusic",
        component: () => import("@/views/findMusic/index.vue"),
      },
      {
        path: "dynamic",
        name: "dynamic",
        component: () => import("@/views/dynamic/index.vue"),
      },
      {
        path: "video",
        name: "video",
        component: () => import("@/views/video/index.vue"),
      },
      {
        path: "discover",
        name: "discover",
        component: () => import("@/views/discover/index.vue"),
      },
      // 歌单路由
      {
        path: "playlist",
        name: "playlist",
        component: () => import("@/views/details/playlistDetails/index.vue"),
      },
      // 歌手路由
      {
        path: "artistDetail",
        name: "artistDetail",
        component: () => import("@/views/details/artistDetails/index.vue"),
      },
      // 专辑路由
      {
        path: "albumDetail",
        name: "albumDetail",
        component: () => import("@/views/details/albumDetails/index.vue"),
      },
      // 搜索路由
      {
        path: "search",
        name: "search",
        component: () => import("@/views/search/index.vue"),
        children:[
          {
            path: "/",
            redirect: "song",
          },
          {
            path:'song',
            name:'searchSong',
            component: () => import("@/views/search/sSong.vue"),
          },
          {
            path:'artist',
            name:'searchArtist',
            component: () => import("@/views/search/sArtist.vue"),
          },
          {
            path:'album',
            name:'searchAlbum',
            component: () => import("@/views/search/sAlbum.vue"),
          },
          {
            path:'playlist',
            name:'searchPlaylist',
            component: () => import("@/views/search/sPlaylist.vue"),
          },
          {
            path:'video',
            name:'searchVideo',
            component: () => import("@/views/search/sVideo.vue"),
          },
          {
            path:'lyric',
            name:'searchLyric',
            component: () => import("@/views/search/sLyric.vue"),
          },
        ]
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;
