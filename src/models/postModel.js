import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const postSchema = z.object({
    id: z.number({
        required_error: "ID é obrigatório.",
        invalid_type_error: "O ID dever ser um número inteiro.",
    }),
    body: z.string({
        required_error: "O corpo da postagem é obrigatório.",
        invalid_type_error: "O corpo da postagem deve ser uma string.",
    })
        .min(3, { message: "O corpo da postagem deve ter no mínimo 3 caracteres." })
        .max(1000, { message: "O corpo da postagem deve ter no máximo 1000 caracteres." }),
    like: z.number({
        required_error: "O like é obrigatório.",
        invalid_type_error: "O like deve ser um número inteiro.",
    }),
    date: z.date({
        invalid_type_error: "A data deve ser uma data.",
    }),
    author: z.number({
        required_error: "O autor é obrigatório.",
        invalid_type_error: "O autor deve ser um número inteiro.",
    }),
})

const create = async (post) => {
    return await prisma.post.create({
        data: { body: post.body, user: { connect: { id: post.author } } }
    });
}
const remove = async (id) => {
    return await prisma.post.delete({
        where: {
            id,
        },
    });
}
const update = async (post) => {
    return await prisma.post.update({
        where: {
            id: post.id,
        },
        data: post,
    });
}

const listOrderByDate = async () => {
    return await prisma.post.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    perfil_image: true,
                },
            }
        },
        orderBy: {
            date: 'desc',
        },
    });
}

const listOrderByLike = async () => {
    return await prisma.post.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    perfil_image: true,
                },
            }
        },
        orderBy: {
            like: 'desc',
        },
    });
}

export default { create, remove, update, listOrderByDate, listOrderByLike };