import prisma from "../../utils/prisma";

export default defineEventHandler(async (event) => {
        const {category} = await readBody(event)
        return prisma.category.create({
            data: {
                name: category
            }
        })
    }
)














