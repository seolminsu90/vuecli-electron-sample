import { Menu } from 'electron'
import { resetSharedData } from './file-data-share.js'

const openDevToolsInNewWindow = (win) => {
    win.webContents.openDevTools({ mode: 'detach' })
}

const useMenu = (win) => {
    const menuTemplate = [
        {
            label: '메뉴',
            submenu: [
                {
                    label: '개발자도구 열기',
                    click: () => openDevToolsInNewWindow(win)
                },
                {
                    label: '로그아웃',
                    click: () => {
                        resetSharedData()
                        win.webContents.send('onLogout')
                    }
                },
                {
                    label: '종료',
                    role: 'quit'
                }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
}

export { useMenu }
