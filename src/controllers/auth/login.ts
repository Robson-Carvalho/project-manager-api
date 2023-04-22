import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models/User";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

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

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        message: `No user registered with e-mail ${email}`,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({
        message: "Invalid password",
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
      message: "Authentication performed successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
