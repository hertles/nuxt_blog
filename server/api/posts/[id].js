import prisma from "~/utils/prisma";

export default defineEventHandler(async (e)=>{
    const id = e.context.params.id
    console.log(id)
    return prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    })
})
