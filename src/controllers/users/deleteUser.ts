import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/User";

interface JWTPayLoad {
  id: number;
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authorization.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY;
    const { id } = jwt.verify(token, secretKey!) as JWTPayLoad;

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete({ _id: id });

    res.status(200).json({ message: "Successfully deleted user" });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
