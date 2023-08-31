import fs from "fs"
import path from "path"
import {fileURLToPath} from "url"
import * as uuid from "uuid"
import useFiles from "~/utils/useFiles"
import sharp from "sharp"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.resolve(path.dirname(__filename), "../")

const createFileUrl = () => {
    const staticUrl = 'api/photos'
    const fileName = uuid.v4() + ".webp"
    let uploadDir
    if (process.env.NODE_ENV === 'development') {
        uploadDir = './public/uploads'
    } else {
        uploadDir = path.join(__dirname, '/public/uploads')
    }
    return {
        url: staticUrl + '/' + fileName,
        fileName,
        uploadDir,
        filePath: uploadDir + '/' + fileName
    }
}

const writePhoto = async (file, maxWidth) => {
    const {url, uploadDir, filePath} = createFileUrl()
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, '0777', true)
    }
    const meta = await sharp(file.buffer).metadata()
    try {
        if (meta.width > maxWidth) {
            await sharp(file.buffer)
                .webp({quality: 90})
                .resize({width: maxWidth})
                .toFile(filePath)
        } else {
            await sharp(file.buffer)
                .webp({quality: 90})
                .toFile(filePath)
        }
    } catch (e) {
        console.log(e)
    }

    return url
}

export default defineEventHandler(async (event) => {
    const {files} = await useFiles(event)
    const pictures = []
    const file = files[0]
    const type = file.mimetype.split("/")[0]
    if (type !== "image") {
        return null
    }
    try {
        const url = await writePhoto(file, 1500)
        pictures.push(url)
    } catch (e) {
        throw new Error(e)
    }
    return pictures
})
