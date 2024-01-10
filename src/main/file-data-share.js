import path from 'path'
import { app } from 'electron'
import fs from 'fs'

let initialized = false
let sharedData = {}

const initialize = () => {
    if (initialized) return true

    console.log('[info] file data initialize')
    initialized = true
    try {
        const filePath = path.join(app.getPath('userData'), 'sharedData.json')

        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf-8')
            sharedData = JSON.parse(fileData)
        }
    } catch (e) {
        return false
    } finally {
        return true
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

const getSharedData = () => sharedData
const isEmpty = () => Object.keys(sharedData).length === 0
const resetSharedData = () => saveSharedData(null)

initialize()

export { getSharedData, saveSharedData, resetSharedData, isEmpty }
