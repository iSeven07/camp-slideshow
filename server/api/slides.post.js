import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const filePath = path.resolve('server/data/slides.json')
    const data = await fs.readFile(filePath, 'utf8')
    const slides = JSON.parse(data)

    if (body.action === 'add') {
        slides.push({
            id: Date.now().toString(),
            title: body.title,
            content: body.content,
        })
    } else if (body.action === 'remove') {
        const index = slides.findIndex(s => s.id === body.id)
        if (index !== -1) slides.splice(index, 1)
    }

    await fs.writeFile(filePath, JSON.stringify(slides, null, 2), 'utf8')
    return { success: true, slides }
})