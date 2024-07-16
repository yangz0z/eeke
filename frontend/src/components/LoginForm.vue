<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const form = reactive({
    id: '',
    password: ''
})

const submit = () => {
    axios.post('/api/users/login', form)
    .then((res) => {
        console.log(res)
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