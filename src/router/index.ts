import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path:'/',
        name:'home',
        component:()=>import('../views/Root.vue'),
        children:[
            {
                path:'discover',
                name:'discover',
                component:()=>import('../views/discover/index.vue')
            },
            {
                path:'music',
                name:'music',
                component:()=>import('../views/music/index.vue')
            },
            {
                path:'video',
                name:'video',
                component:()=>import('../views/video/index.vue')
            },
            {
                path:'dj',
                name:'dj',
                component:()=>import('../views/dj/index.vue')
            }
        ]
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;