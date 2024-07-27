<script setup>
import { useRouter } from 'vue-router'
import LoginForm from '@/components/user/LoginForm.vue'

const router = useRouter()

function goJoinPage() {
    router.push({ name: 'join' })
}
</script>

<template>
<div>
    <h1>This is Login Page</h1>
    <LoginForm/>

    <div>
        <button type="button" @click="goJoinPage" id="join">회원가입</button>
    </div>
</div>
</template>