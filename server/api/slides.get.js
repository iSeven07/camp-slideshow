import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async () => {
    const filePath = path.resolve('server/data/slides.json')
    const data = await fs.readFile(filePath, 'utf8')
    return JSON.parse(data)
})