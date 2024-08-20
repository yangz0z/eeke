<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const userName = computed(() => store.state.user.name)
</script>

<template>
<div>
    <h1>This is Main Page !</h1>
    <h3 v-if="userName">{{ userName }}님, 환영합니다. </h3>
    <!-- 버튼 영역 -->
    <div>
        <button type="button" @click="router.push({ name: 'event-register' })" id="event-register">이벤트 등록하기</button>
    </div>
</div>
</template>