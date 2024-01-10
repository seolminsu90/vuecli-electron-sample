import path from 'path'
import { app } from 'electron'
import fs from 'fs'

let sharedData = {}
const getSharedData = () => {
    if (!isEmpty()) return sharedData
    try {
        const filePath = path.join(app.getPath('userData'), 'sharedData.json')

        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf-8')
            sharedData = JSON.parse(fileData)
        }
    } catch (e) {
    } finally {
        return sharedData
    }
}

const saveSharedData = (key, value, flush = true) => {
    try {
        if (key && value) sharedData[key] = value
        else sharedData = {}

        if (flush) {
            const filePath = path.join(app.getPath('userData'), 'sharedData.json')
            const data = JSON.stringify(sharedData)

            fs.writeFileSync(filePath, data)
        }
    } catch (e) {
        console.error(e)
    }
}

const isEmpty = () => {
    return Object.keys(sharedData).length === 0
}

const resetSharedData = () => {
    saveSharedData(null)
}

export { getSharedData, saveSharedData, resetSharedData }
