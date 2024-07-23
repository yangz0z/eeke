<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const userName = computed(() => store.state.user.name)
</script>

<template>
<div>
    <h1>This is Main Page !</h1>
    <h3 v-if="userName">{{ userName }}님, 환영합니다. </h3>
</div>
</template>