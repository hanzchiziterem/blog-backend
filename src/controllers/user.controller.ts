import { Request, Response } from "express";
import prisma from "../prisma/client";
import { generateToken } from "../utils/jwt";
import { hashPassword, verifyPassword } from "../utils/hash";

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

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user.id);
  res.status(200).json({ token });
};

export const getProfile = (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
};

export const signout = async (req: Request, res: Response) => {
  res
    .clearCookie("jwt")
    .status(200)
    .json({ success: true, message: "Logged out successfully." });
};

