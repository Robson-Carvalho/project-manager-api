import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models/User";

interface IUserLogin {
  email: string;
  password: string;
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUserLogin = req.body;

    if (!email) {
      return res.status(400).json({
        message: "e-mail is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "password is required",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({
        message: "invalid password",
      });
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secretKey!,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "authentication performed successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
};
