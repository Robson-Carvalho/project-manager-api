import { Request, Response } from "express";
import { User } from "../../models/User";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, imagePath } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        error: "E-mail is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        error: "Password is required",
      });
    }

    const existEmail = await User.findOne({ email: email });

    if (existEmail) {
      return res.status(400).json({
        error: `The e-mail ${email} is already registered. Please try another one!`,
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({
      email,
      name,
      password: hashedPassword,
      imagePath,
    });

    res.status(201).json({ message: req.body });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
