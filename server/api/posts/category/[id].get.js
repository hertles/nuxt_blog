import prisma from "~/utils/prisma";

export default defineEventHandler(async (event) => {
    const categoryId = Number(event.context.params.id)
    return prisma.post.findMany({
        where: {categories: {every: {category: {id: categoryId}}}},
        include: {categories:
                {
                    select: {category: true}
                }
        }
    })
})
