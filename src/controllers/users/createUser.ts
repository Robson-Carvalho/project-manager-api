import { Request, Response } from "express";
import { User } from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, imagePath } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        message: "E-mail is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    const existEmail = await User.findOne({ email: email });

    if (existEmail) {
      return res.status(400).json({
        message: `The e-mail ${email} is already registered. Please try another one!`,
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
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
