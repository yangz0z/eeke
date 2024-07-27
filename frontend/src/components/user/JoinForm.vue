<script setup>
import { computed, watch, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import mainPage from '@/views/MainPage.vue'

const router = useRouter()
const route = useRoute()
const store = useStore()

const phoneNumber = ref(['010', '', ''])
const password2 = ref('')
const isIdChecked = ref(false)
const idCheckResult = ref('')

const form = reactive({
    loginId: '',
    password: '',
    name: '',
    phone: computed(() => phoneNumber.value.join('-')),
    birthDate: '',
    gender: 0
})

// 아이디 중복체크
const checkId = () => {
    const regex = /^[a-zA-Z0-9]+$/
    if (!regex.test(form.loginId)) {
        alert('아이디는 영문과 숫자만 입력 가능합니다.')
        form.loginId = ''
        return
    }

    axios.post('/api/users/check-id', form)
    .then((res) => {
        isIdChecked.value = res.data.success
        idCheckResult.value = res.data.message
    })
    .catch((error) => {
        console.error(error)
    })
}

// 생년월일 날짜형식 체크
const isBirthChecked = computed(() => {
    const targetDate = form.birthDate
    const date = moment(targetDate, 'YYYYMMDD', true)
    return date.isValid()
})

// 회원가입
const submit = () => {
    axios.post('/api/users/register', form)
    .then((res) => {
        if(!res.data.success) {
            alert(res.data.message)
        } else {
            alert('회원가입에 성공하였습니다.')
            router.push({ name: 'login' })
        }
    })
    .catch((error) => {
        console.error(error)
    })
}

</script>

<template>
<div>
    <div id="firstStep">
        <div>
            <label for="id">아이디</label>
            <input type="text" id="id" v-model="form.loginId" :disabled="isIdChecked">
            <span>
                <button 
                    type="button" 
                    :disabled="form.loginId.length < 4 || isIdChecked" 
                    @click="checkId"
                >중복체크</button>
                <span>{{ idCheckResult }}</span>
            </span>
        </div>
        <div>
            <label for="pw">비밀번호</label>
            <input type="password" id="pw" v-model="form.password" :disabled="!isIdChecked">
        </div>
        <div>
            <label for="pw2">비밀번호 확인</label>
            <input type="password" id="pw2" v-model="password2" :disabled="form.password.length < 4">
            <span v-show="password2.length >= 4 && form.password === password2">비밀번호가 일치합니다.</span>
        </div>
        <div>
            <label for="name">이름</label>
            <input type="text" id="name" v-model="form.name" :disabled="password2.length < 4 || form.password != password2">
        </div>
        <div>
            <label for="phone1">연락처</label>
            <input type="text" id="phone1" maxLength="3" disabled v-model="phoneNumber[0]">
            <input type="text" id="phone2" maxLength="4" v-model="phoneNumber[1]" :disabled="form.name.length < 2">
            <input type="text" id="phone3" maxLength="4" v-model="phoneNumber[2]" :disabled="form.name.length < 2">
        </div>
        <div>
            <label for="birthDate">생년월일</label>
            <input 
                type="text" 
                id="birthDate" 
                v-model="form.birthDate" 
                placeholder="YYYYMMDD" 
                maxlength="8" 
                :disabled="form.phone.length < 13"
            >
        </div>
        <div>
            <label>성별</label>
            <input type="radio" id="male" value="0" v-model="form.gender" :disabled="!isBirthChecked">
            <label For="male">남</label>
            <input type="radio" id="female" value="1" v-model="form.gender" :disabled="!isBirthChecked">
            <label For="female">여</label>
        </div>
        <div>
            <button type="button" @click="submit" :disabled="form.birthDate.length < 8">회원가입</button>
        </div>
    </div>
</div>
</template>