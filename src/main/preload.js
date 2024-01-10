import { ipcRenderer, contextBridge } from 'electron'

console.log("Render / Main 통신을 위한 사전 정의 스크립트가 로드되었어요.")

// Renderer, Main을 연결해줄 기능들을 정의한다.
contextBridge.exposeInMainWorld('MainApp', {
    send: (type, message) => ipcRenderer.send(type, message),
    on: (type, callback) => ipcRenderer.on(type, callback)
})
