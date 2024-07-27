<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import mainPage from '@/views/MainPage.vue'

const router = useRouter()
const route = useRoute()
const store = useStore()

const form = reactive({
    id: '',
    password: ''
})

const submit = () => {
    axios.post('/api/users/login', form)
    .then((res) => {
        if(!res.data.success) {
            alert(res.data.message)
        } else {
            // 로그인 성공
            const payload = {
                id: res.data.id,
                loginId: res.data.loginId,
                name: res.data.name,
                token: res.data.token
            }
            store.commit('user/login', payload) // vuex 로그인 정보 저장

            const path = sessionStorage.getItem('CURR_URL')
            const query = JSON.parse(sessionStorage.getItem('CURR_QRY'))
            router.push({ path: path, query: query }) //이전 페이지로 이동
        }
    })
    .catch((error) => {
        console.error(error)
    })
}

</script>

<template>
<div>
    <div>
        <label for="id">아이디</label>
        <input type="text" id="id" v-model="form.id">
    </div>
    <div>
        <label for="pw">비밀번호</label>
        <input type="password" id="pw" v-model="form.password">
    </div>
    <div>
        <button type="button" @click="submit">로그인</button>
    </div>
</div>
</template>