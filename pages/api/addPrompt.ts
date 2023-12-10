import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: "Please sign in to create a prompt." });
  }

  // Defina um tipo para o corpo da requisição
  type RequestBody = {
    title: string;
    content: string;
    categories: string[]; // Assumindo que as categorias são identificadas por strings
    language: string;
    isPrivate: boolean;
  };
  

  const { user } = session;
  const { title, content, categories, language, isPrivate } = req.body as RequestBody;  // Get user from database
  const prismaUser = await prisma.user.findUnique({
    where: { email: session?.user?.email || undefined },
  });

  // Create prompt
  try {
    const body = req.body;

    const result = await prisma.prompt.create({
      data: {
        title,
        content,
        languageId: language as string,
        isPrivate,
        userId: prismaUser?.id as string,
        categories: {
          connect: categories.map(id => ({ id }))
        },
      },
    });

    return res.json(result);
  } catch (err) {
    res.status(402).json({ err: "Error has occured while making a post" });
  }
}
