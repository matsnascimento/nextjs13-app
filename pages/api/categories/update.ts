import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: "Please sign in to update a category." });
  }

  const { categoryId, categoryName, iconName } = req.body;

  // Create category
  try {
    // Create category if not category exist
    const category = await prisma.categoryPrompt.update({
      where: {
        id: categoryId,
      },
      data: {
        content: categoryName,
        iconName: iconName,
      },
    });

    return res.status(200).json(category);
  } catch (err) {
    // console.log(err);
    res
      .status(402)
      .json({ err: "Error has occured while trying to create a category" });
  }
}
