<template>
    <div id="main">
        <RouterView />
    </div>
</template>

<script setup>
    import { onBeforeMount } from 'vue'
    import { router } from '@/router'
    const addListener = () => {
        window.MainApp.on('onLogout', (evt, payload) => {
            router.push('/')
        })
    }

    onBeforeMount(() => addListener())
</script>
