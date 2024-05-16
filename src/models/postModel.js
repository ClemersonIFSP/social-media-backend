import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const postSchema = z.object({
    id: z.number({})
})