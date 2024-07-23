<script setup>
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref, onMounted, watch } from 'vue'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const store = useStore()

const loggedIn = computed(() => !!store.state.user.token)

const logout = () => {
    axios.get('/api/users/logout')
    .then((res) => {
        console.log(res)
        
        if (res.data.success) {
            store.commit('user/logout') // Vuex 상태 초기화
            router.push('/login') // 로그인 페이지로 이동
        } else {
            log.info('failed logout!!')
        }
    })
    .catch((error) => {
        console.error(error)
    })
}
</script>

<template>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/login" v-if="!loggedIn">로그인</RouterLink>
          <a href="#" @click.prevent="logout" v-else>로그아웃</a>
        </nav>
      </div>
    </header>
</template>