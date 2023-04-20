import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/layout/Layout.vue"),
    children: [
      {
        path: "/",
        redirect: "/discover",
      },
      {
        path: "discover",
        name: "discover",
        component: () => import("@/views/discover/index.vue"),
      },
      {
        path: "music",
        name: "music",
        component: () => import("@/views/music/index.vue"),
      },
      {
        path: "video",
        name: "video",
        component: () => import("@/views/video/index.vue"),
      },
      {
        path: "dj",
        name: "dj",
        component: () => import("@/views/dj/index.vue"),
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
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;
