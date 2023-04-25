import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models/User";

interface IUser {
  name: string;
  email: string;
  password: string;
  imagePath: string;
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, imagePath }: IUser = req.body;

    if (!name) {
      return res.status(400).json({
        message: "name is required",
      });
    }

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

    const existEmail = await User.findOne({ email: email });

    if (existEmail) {
      return res.status(400).json({
        message: `the e-mail ${email} is already registered. Please try another one!`,
      });
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS!);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      imagePath,
    });

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secretKey!,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: `${name.split(" ")[0]} user successfully registered`,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
};
