import { createRouter, createWebHistory } from "vue-router";

import Home from '../views/Home.vue';
const lazyLoad = (view) => import(`../views/${view}.vue`);

const routes = [
    {
        path: '/connecting-dots',
        name: 'Home',
        component: Home,
    },
    {
        path: '/connecting-dots/modes',
        name: 'Game-Modes',
        component: lazyLoad('GameModes'),
    },
    {
        path: '/connecting-dots/shape',
        name: 'ShapeGame-Options',
        component: lazyLoad('ShapeGameOptions'),
    },
    {
        path: '/connecting-dots/square',
        name: 'ShapeGame-Square',
        component: lazyLoad('ShapeGameSquare'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;