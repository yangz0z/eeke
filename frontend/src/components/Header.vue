<script setup>
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { computed, ref, onMounted, watch } from "vue";

const router = useRouter()
const route = useRoute()

const loggedIn = ref(false)

</script>

<template>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/login" v-if="!loggedIn">로그인</RouterLink>
          <!-- <RouterLink to="/" v-else>로그아웃</RouterLink> -->
        </nav>
      </div>
    </header>
</template>