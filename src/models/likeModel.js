import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const likeSchema = z.object({
    userId: z.number({
        required_error: "ID é obrigatório.",
        invalid_type_error: "O ID dever ser um número inteiro.",
    }),
    postId: z.number({
        required_error: "ID é obrigatório.",
        invalid_type_error: "O ID dever ser um número inteiro.",
    }),
})

const add = async (like) => {
    return await prisma.like.create({
        data: like,
    });
}

const remove = async (like) => {
    return await prisma.like.delete({
        where: {
            userId_postId: {
                userId: like.userId,
                postId: like.postId,
            },
        },
    });
}

export default { add, remove };