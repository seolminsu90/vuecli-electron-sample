<template>
    <div class="center-flex-box">
        <div class="login-bg"><img src="@/assets/bg.png" /></div>

        <div class="login-wrap">
            <div class="text-center mb-3">
                <h1>Login</h1>
            </div>
            <div class="row mb-3">
                <div class="">
                    <input type="text" class="form-control" placeholder="아이디" />
                </div>
            </div>
            <div class="row mb-3">
                <div class="">
                    <input type="password" class="form-control" placeholder="패스워드" />
                </div>
            </div>
            <div class="row ps-2 pe-2 text-center">
                <button type="button" class="btn bg-white" @click="login">로그인</button>
            </div>
        </div>
    </div>
    <div class="dim" v-show="loading">
        <div class="loader-container">
            <div class="loader"></div>
            <p>로그인 요청 중..</p>
        </div>
    </div>
</template>
<script setup>
    import { router } from '@/router'
    import { ref, onMounted } from 'vue'

    const loading = ref(false)
    const login = () => {
        loading.value = true
        // TODO Login Process Here !!

        window.MainApp.send('onLoginSuccess', 'INPUT YOUR USER DATA')
    }

    const addListener = () => {
        // MainApp 로그인 성공 이후 호출되는 이벤트 리스너 등록
        window.MainApp.on('replyLoginSuccess', (evt, payload) => {
            router.push('/main')
            console.log(evt, payload)
        })
    }

    onMounted(() => addListener())
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
