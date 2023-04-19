import { Request, Response } from "express";
import { User } from "../../models/User";

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const authLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

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

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        error: `No user registered with e-mail ${email}`,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({
        error: "Invalid password",
      });
    }

    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
      { expiresIn: "1d" }
    );

    res
      .status(200)
      .json({ message: "Authentication performed successfully", token });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
