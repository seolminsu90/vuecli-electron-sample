import { Notification } from 'electron'
import path from 'path'
import { AppConst } from './const.js'

const showAlert = (payload) => {
    const defaultIcon = AppConst.isServeMode()
        ? 'public/icon.png'
        : path.join(__dirname, '/icon.png')
    const iconPath = payload.icon !== undefined ? payload.icon : defaultIcon

    new Notification({
        title: payload.title,
        body: payload.body,
        icon: iconPath
    }).show()
}

export { showAlert }
