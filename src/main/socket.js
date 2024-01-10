import { showAlert } from './notification.js'
import { w3cwebsocket as WebSocket } from 'websocket'
let webSocket

// TODO 소켓 로직 작성
const init = () => {
    return new Promise((resolve, reject) => {
        const serverAddress = process.env.VUE_APP_SOCKET_ENDPOINT

        webSocket = new WebSocket(serverAddress)

        webSocket.onopen = function () {
            console.log('WebSocket connection opened')
            resolve(webSocket)
        }

        webSocket.onmessage = function (event) {
            console.log('Received message: ' + event.data)
            const payload = JSON.parse(event.data).message
            showAlert(payload)
        }

        webSocket.onclose = function () {
            console.log('WebSocket connection closed')
            reconnect()
            reject(new Error('WebSocket connection closed'))
        }

        webSocket.onerror = function (event) {
            console.error('WebSocket error: ' + event)
            reconnect()
            reject(new Error('WebSocket error'))
        }
    })
}

const reconnect = () => {
    setTimeout(() => {
        console.log('WebSocket connect retry...')
        init()
    }, 5000)
}
const send = (title, body) => {
    try {
        const message = JSON.stringify({ message: { title: title, body: body } })
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(message)
            console.log('Sent message: ' + message)
            return true
        } else {
            console.log('WebSocket connection not open')
            return false
        }
    } catch (e) {
        console.log(e)
        return false
    }
}

export { init, send }
