import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.prompt.findUnique({
        where: {
          id: req.query.promptId as string,
        },
        include: {
          user: true,
          categories: true,
          language: true,
        },
      });
      return res.status(200).json(data);
    } catch (err) {
      res
        .status(403)
        .json({ err: "Error has occured while getting post details" });
    }
  }
}
