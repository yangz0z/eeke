<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import LoginForm from '@/components/user/LoginForm.vue'

import axios from 'axios'

const router = useRouter()
const store = useStore()

// 로그인
const submit = (form) => {
    const endpoint = form.oauth ? '/api/users/login/oauth' : '/api/users/login'
    axios.post(endpoint, form)
        .then((res) => {
            if(!res.data.success) {
                alert(res.data.message)
            } else {
                // 로그인 성공
                const payload = {
                    id: res.data.id,
                    loginId: res.data.loginId,
                    name: res.data.name,
                    email: res.data.email,
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

/*
    구글 소셜로그인
*/
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

const googleInit = () => {
    let google = window.google
    google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, 
        callback: googleCallback
    })
    google.accounts.id.renderButton(
      document.getElementById('G_OAuth_btn'), 
      { theme: 'outline', size: 'medium' }
    )
}

const base64UrlDecode = (base64Url) => {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    let binaryString = window.atob(base64)
    let utf8String = decodeURIComponent(escape(binaryString))
    return utf8String
}

const decodeJwtToken = (token) => {
    const parts = token.split('.')
    if (parts.length !== 3) {
        throw new Error('JWT does not have 3 parts')
    }
    const payload = parts[1]
    return base64UrlDecode(payload)
}

const googleCallback = (res) => {
    try {
        const token = res.credential
        const decodedPayload = decodeJwtToken(token)
        const payload = JSON.parse(decodedPayload)
        submit({ 
            oauth: true, 
            email: payload.email,
            name: payload.name
        })
    } catch (error) {
        console.error('Failed to decode JWT', error)
    }
}

onMounted(() => {
    googleInit()
})
</script>

<template>
<div>
    <h1>This is Login Page</h1>
    <LoginForm @login="submit"/>

    <div>
        <div id="G_OAuth_btn"></div>
        <button type="button" @click="router.push({ name: 'join' })" id="join">회원가입</button>
    </div>
</div>
</template>