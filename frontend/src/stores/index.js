import { createStore } from 'vuex'
import userStore from './modules/userStore'
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    modules: {
        user: userStore
    },
    plugins: [createPersistedState({
        paths: ['user']
    })]
})

export default store