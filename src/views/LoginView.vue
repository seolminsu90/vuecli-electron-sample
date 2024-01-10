<template>
    <div v-if="appLoad">
        <div class="center-flex-box">
            <div class="login-bg"><img src="@/assets/bg.png" /></div>

            <div class="login-wrap">
                <div class="text-center mb-3">
                    <h1>Login</h1>
                </div>
                <div class="row mb-3">
                    <div class="">
                        <input type="text" class="form-control" placeholder="아이디" v-model="id" />
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="">
                        <input
                            type="password"
                            class="form-control"
                            placeholder="패스워드"
                            v-model="pwd" />
                    </div>
                    <small class="text-danger ms-2" v-show="errorLogin">비밀번호가 다릅니다.</small>
                </div>
                <div class="row ps-2 pe-2 text-center">
                    <button
                        type="button"
                        class="btn bg-white"
                        @click="login"
                        :disabled="id.length === 0 || pwd.length === 0">
                        로그인
                    </button>
                </div>
            </div>
        </div>
        <div class="dim" v-show="loading">
            <div class="loader-container">
                <div class="loader"></div>
                <p>로그인 요청 중..</p>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="dim">
            <div class="loader-container">
                <div class="loader"></div>
                <p>로딩 중..</p>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { router } from '@/router'
    import { ref, onBeforeMount } from 'vue'
    import { useAuthStore } from '@/store'
    import { useAxios } from '@/http'

    const authHost = process.env.VUE_APP_AUTH_HOST
    const loading = ref(false)
    const Axios = useAxios()

    const id = ref('')
    const appLoad = ref(false)
    const pwd = ref('')
    const errorLogin = ref(false)

    const login = async () => {
        loading.value = true
        errorLogin.value = false

        const res = await Axios.post(`${authHost}/api/token`, {
            username: id.value,
            password: pwd.value
        })

        if (res.status === 200) {
            window.MainApp.send('onLoginSuccess', res.data)
        } else {
            errorLogin.value = true
        }

        loading.value = false
    }

    const addListener = () => {
        window.MainApp.on('loadSavedAuth', (evt, payload) => {
            if (payload === null || Object.keys(payload).length === 0) {
                appLoad.value = true
                console.log('[info] 저장된 자격증명 없음')
                return
            }
            console.log(payload)

            // 저장된 자격증명을 통해 자동 로그인 처리
            const store = useAuthStore()
            store.set(payload)
            router.push('/main')
        })

        window.MainApp.on('replyLoginSuccess', (evt, payload) => {
            console.log(payload)
            router.push('/main')
        })

        setTimeout(() => window.MainApp.send('onCheckSavedAuth'), 100)
    }

    onBeforeMount(() => addListener())
</script>
<style scoped lang="scss">
    .center-flex-box {
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        background: #301700;
    }

    .login-bg {
        width: 60vw;
        height: 100vh;
        background-color: #fff;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;

        img {
            width: 100%;
            height: 100%;
        }
    }

    input::placeholder {
        color: #fff;
    }

    .login-wrap {
        width: 40vw;
        height: 30vh;
        padding: 2rem;
        min-width: 300px;
        min-height: 300px;
        background: transparent;
        border-radius: 8px;
    }

    label {
        color: #fff;
    }

    input {
        background: transparent !important;
        border: none !important;
        color: #fff !important;
    }

    h1 {
        color: #fff;
        font-weight: bold;
    }

    .dim {
        position: fixed;
        display: flex;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
        top: 0;
        left: 0;
        justify-content: center;
        align-items: center;
    }
</style>
