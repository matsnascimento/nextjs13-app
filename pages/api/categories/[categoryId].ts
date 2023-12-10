import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" || req.method === "GET") {
    try {
      const data = await prisma.categoryPrompt.findUnique({
        where: {
          id: req.query.categoryId as string,
        },
      });
      return res.status(200).json(data);
    } catch (err) {
      res
        .status(403)
        .json({ err: "Error has occured while getting category details" });
    }
  }
}
