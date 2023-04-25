import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models/User";

import { JWTPayLoad } from "../../types/JWTPayLoad";

interface IUpdateUser {
  email: string;
  name: string;
  currentPassword: string;
  newPassword: string;
  imagePath: string;
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    const {
      email,
      name,
      currentPassword,
      newPassword,
      imagePath,
    }: IUpdateUser = req.body;

    if (!authorization) {
      return res.status(401).json({ message: "not authorized" });
    }

    if (!email) {
      return res.status(400).json({
        message: "E-mail is required",
      });
    }

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if (!currentPassword) {
      return res.status(400).json({
        message: "Current password is required",
      });
    }

    if (!newPassword) {
      return res.status(400).json({
        message: "New password is required",
      });
    }

    const token = authorization.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY;
    const { id } = jwt.verify(token, secretKey!) as JWTPayLoad;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email !== user.email) {
      if (await User.findOne({ email: email })) {
        return res.status(400).json({
          message: `The e-mail ${email} is already registered. Please try another one!`,
        });
      }
    }

    if (!(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(422).json({
        message: "Invalid password",
      });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS!);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds!);

    await User.findByIdAndUpdate(id, {
      email,
      name,
      password: hashedPassword,
      imagePath,
    });

    res.status(200).json({ message: "User information changed successfully" });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
