import { createRouter, createWebHistory } from 'vue-router'
import userRoutes from '@/router/user.js'
import MainPage from '../views/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    ...userRoutes
  ]
})

router.beforeEach((to, from, next) => {
  // 로그인, 로그아웃, 회원가입 url 저장하지 않음
  if(to.path !== '/login' && to.path !== '/logout' && to.path !== '/join' ) {
      sessionStorage.setItem('CURR_URL', to.path)

      //object -> string로 변경 => JSON.stringify(변경할오브젝트)
      //string -> object로 변경 => JSON.parse(변경할문자)
      sessionStorage.setItem('CURR_QRY', JSON.stringify(to.query))
  }
  next()
})

export default router
