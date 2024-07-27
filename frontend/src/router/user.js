import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/user/LoginPage.vue'
import JoinPage from '../views/user/JoinPage.vue'

export default [
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/join',
        name: 'join',
        component: JoinPage
    },
]