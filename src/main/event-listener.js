import { ipcMain } from 'electron'
import { init, send } from './socket.js'

// Render와 함께 정의한 임의의 이벤트를 받아서 처리해준다.
const ipcEventListen = () => {
    ipcMain.on('onLoginSuccess', async (evt, payload) => {
        console.log(`on login success !! ${payload} `)

        // Login 성공 시 MainApp에서 소켓 연결
        // 유저 처리 및 소켓 연결
        await init()
        send('로그인 성공', '반갑습니다.')

        // (optional) CALLBACK to replyLoginSuccess
        evt.reply('replyLoginSuccess', 'YOUR_SUCCESS_CALLBACK_DATA')
    })

    ipcMain.on('onSendMessage', async (evt, payload) => {
        console.log(`message send test ${payload}`)
        const msg = JSON.parse(payload)
        send(msg.message.title, msg.message.body)

        evt.reply('replySendMessage', payload)
    })
}

export { ipcEventListen }
