import prisma from "~/utils/prisma";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    if (query.category === "0") {
        return prisma.post.findMany({
            where: {
                OR: [
                    {title: {contains: query.search}},
                    {content: {contains: query.search}}
                ]
            },
            include: {
                categories:
                    {
                        select: {category: true}
                    }
            }
        })
    }
    return prisma.post.findMany({
        where: {
            OR: [
                {title: {contains: query.search}},
                {content: {contains: query.search}}
            ],
            AND: {
                categories: {
                        some: {
                            category: {
                                is: {
                                    id: Number(query.category)
                                }
                            }
                        }
                    }
            }
        },
        include: {
            categories:
                {
                    select: {category: true}
                }
        }
    })
})
