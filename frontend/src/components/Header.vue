<script setup>
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref, onMounted, watch } from 'vue'

const router = useRouter()
const route = useRoute()
const store = useStore()

const loggedIn = computed(() => !!store.state.user.token)

</script>

<template>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/login" v-if="!loggedIn">로그인</RouterLink>
          <RouterLink to="/" v-else>로그아웃</RouterLink>
        </nav>
      </div>
    </header>
</template>