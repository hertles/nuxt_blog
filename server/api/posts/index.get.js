import prisma from "~/utils/prisma";

export default defineEventHandler(async () => {
    return prisma.post.findMany()
})
