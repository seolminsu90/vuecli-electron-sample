import { Notification } from 'electron'
import path from 'path'

const showAlert = (payload) =>
    new Notification({
        title: payload.title,
        body: payload.body,
        icon: path.join(__dirname, 'icon.png')
    }).show()

export { showAlert }
