import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const {title, content, contentText, annotation, categories} = await readBody(event)
    return prisma.post.create({
        data: {
            title,
            content,
            contentText,
            annotation,
            categories: categories
                ? {
                    create: categories.map(cat => ({
                        category: {
                            connect: {
                                id: cat
                            }
                        }
                    }))
                }
                : undefined
        }
    })
})
