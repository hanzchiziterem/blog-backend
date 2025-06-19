import { Request, Response } from "express";
import prisma from "../prisma/client";
import { generateToken } from "../utils/jwt";
import { hashPassword } from "../utils/hash";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const doesUserExist = await prisma.user.findUnique({ where: email });
  if (doesUserExist) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const token = generateToken(user.id);
  res.status(201).json({ token });
};
