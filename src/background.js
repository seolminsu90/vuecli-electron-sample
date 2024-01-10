import { app, protocol, BrowserWindow } from 'electron'
import { createWindow, createTray } from './main/main-window.js'
import { ipcEventListen } from './main/event-listener.js'
import { useMenu } from './main/menu.js'
import unhandled from 'electron-unhandled'

if (process.platform === 'win32') {
    app.setAppUserModelId(app.name)
}

const isDevelopment = process.env.NODE_ENV !== 'production'

protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])

let appTray = null
let appWindow = null
app.on('ready', async () => {
    appWindow = await createWindow(isDevelopment)
    appTray = await createTray(appWindow)
    useMenu(appWindow)

    appEventListen()
    ipcEventListen()
})

// 앱이 준비되면 기본이벤트 연결
const appEventListen = () => {
    app.on('activate', async () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            await createWindow()
        }
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    app.on('before-quit', () => {
        app.isQuiting = true
    })

    if (isDevelopment) {
        if (process.platform === 'win32') {
            process.on('message', (data) => {
                if (data === 'graceful-exit') {
                    app.quit()
                }
            })
        } else {
            process.on('SIGTERM', () => {
                app.quit()
            })
        }
    }
}

unhandled({
    logger: (error) => {
        // 사용자 지정 로깅 또는 오류 보고 로직을 여기에 추가
        console.error(error)
    },
    showDialog: true
})
