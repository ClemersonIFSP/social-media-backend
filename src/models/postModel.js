import { PrismaClient } from "@prisma/client";
import { format } from 'date-fns';
import { z } from "zod";
const prisma = new PrismaClient();

const postSchema = z.object({
  id: z.number({
    required_error: "ID é obrigatório.",
    invalid_type_error: "O ID dever ser um número inteiro.",
  }),
  body: z
    .string({
      required_error: "O corpo da postagem é obrigatório.",
      invalid_type_error: "O corpo da postagem deve ser uma string.",
    })
    .min(3, { message: "O corpo da postagem deve ter no mínimo 3 caracteres." })
    .max(1000, {
      message: "O corpo da postagem deve ter no máximo 1000 caracteres.",
    }),
  date: z.date({
    invalid_type_error: "A data deve ser uma data.",
  }),
  author: z.number({
    required_error: "O autor é obrigatório.",
    invalid_type_error: "O autor deve ser um número inteiro.",
  }),
});

const create = async (post) => {
  return await prisma.post.create({
    data: { body: post.body, user: { connect: { id: post.author } } },
  });
};
const remove = async (id) => {
  return await prisma.post.delete({
    where: {
      id,
    },
  });
};
const update = async (id, post) => {
  const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS');
  const date = new Date(formattedDate).toISOString();
  return await prisma.post.update({
    where: {
      id,
    },
    data: { ...post, date },
  });
};

const getByid = async (id) => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
}

const listNewPosts = async () => {
  return await prisma.post.findMany({
    include: {
      user: {
        select: {
          name: true,
          perfil_image: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
};

const listOldPosts = async () => {
  return await prisma.post.findMany({
    include: {
      user: {
        select: {
          name: true,
          perfil_image: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });
};

const listUserPosts = async (author) => {
  return await prisma.post.findMany({
    where: {
      author,
    },
    include: {
      user: {
        select: {
          name: true,
          perfil_image: true,
        },
      },
    },
  });
};

export default {
  create,
  remove,
  update,
  getByid,
  listNewPosts,
  listOldPosts,
  listUserPosts,
};
