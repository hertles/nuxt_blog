import prisma from "~/utils/prisma";

export default defineEventHandler(async (event) => {
    const post = await readBody(event)
    return prisma.post.create({
        data: {...post}
    })
})
