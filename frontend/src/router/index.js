import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LoginPage from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 로그인, 로그아웃 url 저장하지 않음
  if(to.path !== '/login' && to.path !== '/logout' ) {
      sessionStorage.setItem('CURR_URL', to.path)

      //object -> string로 변경 => JSON.stringify(변경할오브젝트)
      //string -> object로 변경 => JSON.parse(변경할문자)
      sessionStorage.setItem('CURR_QRY', JSON.stringify(to.query))
  }
  next()
});

export default router
