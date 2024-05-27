import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const userSchema = z.object({
  id: z.number({
    required_error: "ID é obrigatório.",
    invalid_type_error: "O ID dever ser um número inteiro.",
  }),
  name: z
    .string({
      required_error: "Nome é obrigatório.",
      invalid_type_error: "O nome deve ser uma string.",
    })
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres." })
    .max(250, { message: "O email deve ter no máximo 250 caracteres." }),
  email: z
    .string({
      required_error: "O email é obrigatório.",
      invalid_type_error: "O email dever ser uma string.",
    })
    .email({ message: "Email inválido." })
    .max(250, { message: "O email deve ter no máximo 250 caracteres." }),
  password: z
    .string({
      required_error: "A senha é obrigatória.",
      invalid_type_error: "A senha deve ser uma string",
    })
    .min(8, { message: "A senha dever ter no mínimo 6 caracteres." }),
  perfil_image: z
    .string({
      required_error: "A imagem do perfil é obrigatória.",
      invalid_type_error: "A imagem do perfil deve ser uma string.",
    })
    .url({ message: "URL da imagem do perfil invalida." })
    .max(1000, { message: "A imagem do perfil deve ter no máximo 1000." }),
  banner_image: z
    .string({
      required_error: "A imagem do banner é obrigatória.",
      invalid_type_error: "A imagem do banner deve ser uma string.",
    })
    .url({ message: "URL da imagem do banner invalida." })
    .max(1000, { message: "A imagem do banner deve ter no máximo 1000." }),
});

const validadeToCreate = (user) => {
  const partialUserSchema = userSchema.partial({ id: true, perfil_image: true, banner_image: true });
  return partialUserSchema.safeParse(user);
};

const validadeToUpdate = (user) => {
  const partialUserSchema = userSchema.partial({ password: true });
  return partialUserSchema.safeParse(user);
};

const validadeToLogin = (user) => {
  const partialUserSchema = userSchema.pick({ email: true, password: true });
  return partialUserSchema.safeParse(user);
};

const create = async (user) => {
  return await prisma.user.create({
    data: user,
  });
};

const remove = async (id) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

const update = async (user) => {
  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: user,
  });
};

const getByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export default { validadeToCreate, validadeToUpdate, validadeToLogin, create, remove, update, getByEmail };
