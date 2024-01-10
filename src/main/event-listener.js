import { ipcMain } from 'electron'
import { init, send } from './socket.js'
import { getSharedData, saveSharedData } from './file-data-share.js'

// Render와 함께 정의한 임의의 이벤트를 받아서 처리해준다.
const ipcEventListen = () => {
    ipcMain.on('onCheckSavedAuth', async (evt, payload) => {
        evt.reply('loadSavedAuth', getSharedData())
    })

    ipcMain.on('onLoginSuccess', async (evt, payload) => {
        console.log(`on login success !! ${payload} `)

        await init()

        // TODO 기타기타 검증 프로세스

        send('로그인 성공', '반갑습니다.')
        saveSharedData('username', 'tester')

        evt.reply('replyLoginSuccess', getSharedData())
    })

    ipcMain.on('onSendMessage', async (evt, payload) => {
        console.log(`message send test ${payload}`)
        const msg = JSON.parse(payload)
        send(msg.message.title, msg.message.body)

        evt.reply('replySendMessage', payload)
    })
}

export { ipcEventListen }
