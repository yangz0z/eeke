import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/event/Register.vue'

export default [
    {
        path: '/event/register',
        name: 'event-register',
        component: Register
    },
]