import { Menu } from 'electron'
const openDevToolsInNewWindow = (win) => {
    win.webContents.openDevTools({ mode: 'detach' })
}

const useMenu = (win) => {
    const menuTemplate = [
        {
            label: '메뉴',
            submenu: [
                {
                    label: 'DevTool',
                    click: () => openDevToolsInNewWindow(win)
                },
                { role: 'quit' } // 정의된 메뉴 Role
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
}

export { useMenu }
