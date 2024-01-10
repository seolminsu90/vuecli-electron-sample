import { ipcMain } from 'electron'
import { init, send } from './socket.js'
import { showAlert } from './notification.js'
import { getSharedData, saveSharedData, isEmpty } from './file-data-share.js'

// Render와 함께 정의한 임의의 이벤트를 받아서 처리해준다.
const ipcEventListen = () => {
    ipcMain.on('onCheckSavedAuth', async (evt, payload) => {
        if (!isEmpty()) {
            console.log('[info] 자격정보가 있기에 소켓을 자동 연결합니다.')
            await connectSocket()
        }

        evt.reply('loadSavedAuth', getSharedData())
    })

    ipcMain.on('onLoginSuccess', async (evt, payload) => {
        console.log(`on login success !! ${payload} `)

        await connectSocket()
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

const connectSocket = async () => {
    await init()

    // TODO 기타기타 소켓 연결 검증 프로세스

    showAlert({
        title: '로그인',
        body: '성공'
    })
}

export { ipcEventListen }
