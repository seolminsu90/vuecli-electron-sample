import { BrowserWindow, app, Menu, Tray } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { AppConst } from './const.js'
import path from 'path'

const createWindow = async (isDevelopment) => {
    let win = new BrowserWindow({
        width: 850,
        height: 485,
        resizable: false,
        webPreferences: {
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    if (isDevelopment && process.env.WEBPACK_DEV_SERVER_URL) {
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    } else {
        createProtocol('app')
        win.loadURL('app://./index.html')
    }

    // 메인 창이 닫힐 때의 이벤트 처리
    win.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault()
            win.hide()
        }
    })

    // 메인 창이 닫혔을 때의 이벤트 처리
    win.on('closed', () => {
        win = null
    })

    return win
}

const createTray = async (win) => {
    const iconPath = AppConst.isServeMode() ? 'public/icon.png' : path.join(__dirname, '/icon.png')

    const tray = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([
        { label: '열기', click: () => win.show() },
        { label: '종료', click: () => app.quit() }
    ])

    tray.setToolTip(AppConst.APPLICATION_NAME)
    tray.setContextMenu(contextMenu)

    // 트레이 아이콘을 클릭했을 때의 동작
    tray.on('click', () => {
        win.show()
    })
    return tray
}

export { createWindow, createTray }
