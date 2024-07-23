import router from '@/router'

const userStore = {
    namespaced: true,
    state: {
        id: '',
        loginId: '',
        name: '',
        token: ''
    },
    mutations: {
        login: function (state, payload) {
            state.id = payload.id
            state.loginId = payload.loginId
            state.name = payload.name
            state.token = payload.token
        },
        loginCheck: function (state) {
            if (!state.token) {
                router.push({
                    name: 'login'
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    },
}

export default userStore