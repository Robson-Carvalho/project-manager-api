import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../../models/User";

interface JWTPayLoad {
  email: string;
}

export const recoveringPassword = async (req: Request, res: Response) => {
  try {
    const token = req.params.token;
    const { newPassword } = req.body;

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!newPassword) {
      return res.status(401).json({ message: "Password is required" });
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const { email } = jwt.verify(token, secretKey!) as JWTPayLoad;

    const user = User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const saltRounds = process.env.SALT_ROUNDS;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds!);

    await User.findOneAndUpdate(
      { email: email },
      {
        password: hashedNewPassword,
      }
    );

    res.status(200).json({ message: "Password recovered successfully" });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
