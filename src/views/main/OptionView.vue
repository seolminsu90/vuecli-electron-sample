<template>
    <div class="d-flex">
        <nav>
            <ul class="list-group list-group-flush">
                <li
                    class="list-group-item"
                    :class="{ active: active === 'setting' }"
                    @click="moveTab('setting')">
                    알림 설정
                </li>
                <li
                    class="list-group-item"
                    :class="{ active: active === 'history' }"
                    @click="moveTab('history')">
                    알림 이력
                </li>
                <li
                    class="list-group-item"
                    :class="{ active: active === 'test' }"
                    @click="moveTab('test')">
                    테스트
                </li>
            </ul>
        </nav>
        <div id="content-wrap">
            <div v-if="active === 'setting'">
                <div class="p-3">
                    <div class="d-flex align-items-center mb-4">
                        <label class="me-2 setting-label">이거 알림</label>
                        <label class="switch">
                            <input type="checkbox" checked />
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="d-flex align-items-center mb-4">
                        <label class="me-2 setting-label">저거 알림</label>
                        <label class="switch">
                            <input type="checkbox" checked />
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <div class="d-flex align-items-center mb-4">
                        <label class="me-2 setting-label">요거 알림</label>
                        <label class="switch">
                            <input type="checkbox" checked />
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
            <div v-if="active === 'history'">
                <div class="p-3">
                    <div class="mb-2 d-flex align-items-center justify-content-center">
                        <div class="profile-wrap">
                            <img src="@/assets/robot.png" />
                        </div>
                        <div class="message-wrap">
                            <div class="author">author</div>
                            <div class="title">title</div>
                            <div class="content">content</div>
                        </div>
                    </div>
                    <div
                        class="mb-2 d-flex align-items-center justify-content-center"
                        v-for="(v, i) in messages"
                        :key="i">
                        <div class="profile-wrap">
                            <img src="@/assets/robot.png" />
                        </div>
                        <div class="message-wrap">
                            <div class="author">ECHO</div>
                            <div class="title">{{ v.title }}</div>
                            <div class="content">{{ v.body }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="active === 'test'">
                <div class="p-3">
                    <div class="d-flex align-items-center justify-content-center">
                        <div id="output"></div>
                        <input
                            class="form-control"
                            type="text"
                            v-model="message"
                            placeholder="Type your message" />
                        <button class="btn btn-primary" @click="sendMessage">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'

    const active = ref('setting')
    const message = ref('')
    const messages = ref([])
    const sendMessage = () => {
        const payload = {
            message: {
                title: 'message_title',
                body: message.value
            }
        }

        window.MainApp.send('onSendMessage', JSON.stringify(payload))
    }
    const moveTab = (tab) => {
        active.value = tab
    }

    const addListener = () => {
        window.MainApp.on('replySendMessage', (evt, payload) => {
            console.log(payload)
            const msg = JSON.parse(payload)
            messages.value.push(msg.message)
        })
    }

    onMounted(() => addListener())
</script>
<style scoped>
    nav {
        height: 100vh;
        width: 20vw;
        background: #e4edfb;
    }

    .content-wrap {
        width: 80vw;
        max-height: 100vh;
        overflow-y: auto;
    }

    .setting-label {
        font-size: 13px;
    }

    .profile-wrap img {
        border: 1px solid #ccc;
        border-radius: 100%;
    }

    .message-wrap {
        margin-left: 1rem;
        padding: 0.5rem 1rem;
        background: #eee;
        border-radius: 0.7rem;
        position: relative;
        min-width: 200px;
    }

    .message-wrap:before {
        content: '';
        position: absolute;
        border-style: solid;
        border-width: 10px 10px 0;
        border-color: #f0f0f0 transparent transparent;
        top: 50%;
        left: 0;
        transform: translateX(-50%);
    }

    .author {
        font-size: 13px;
        font-weight: bold;
        color: #0a58ca;
    }

    .title {
        font-size: 13px;
        font-weight: bold;
    }

    .content {
        font-size: 12px;
    }
</style>
