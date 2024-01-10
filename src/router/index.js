import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '',
        name: 'login',
        component: () => import('@/views/LoginView.vue')
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('@/views/MainView.vue'),
        children: [
            {
                path: '',
                name: 'option',
                component: () => import('@/views/main/OptionView.vue')
            }
        ]
    }
]

const router = createRouter({
    history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
    routes: routes
})

router.beforeEach((to, from, next) => {
    next()
})

export { router, routes }
