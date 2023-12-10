import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  console.log(name, email, password)
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "Esse e-mail já está sendo utilizado." }, { status: 400 });
  } else {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, 10),
      },
    });
    return NextResponse.json(user);
  }
}
