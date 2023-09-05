import { createRouter, createWebHistory } from "vue-router";

import Home from '../views/Home.vue';
const lazyLoad = (view) => import(`../views/${view}.vue`);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/modes',
        name: 'Game-Modes',
        component: lazyLoad('GameModes'),
    },
    {
        path: '/shape',
        name: 'ShapeGame-Options',
        component: lazyLoad('ShapeGameOptions'),
    },
    {
        path: '/square',
        name: 'ShapeGame-Square',
        component: lazyLoad('ShapeGameSquare'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;