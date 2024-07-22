<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import mainPage from '@/views/MainPage.vue'

const router = useRouter()
const route = useRoute()

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
            // 로그인 성공 시 메인페이지로 이동
        router.push({ name: 'main' })
        }
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