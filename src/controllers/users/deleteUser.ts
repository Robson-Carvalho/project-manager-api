import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";

import { User } from "../../models/User";

import { JWTPayLoad } from "../../types/JWTPayLoad";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { authorization }: IncomingHttpHeaders = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "not authorized" });
    }

    const token = authorization.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY;
    const { userID } = jwt.verify(token, secretKey!) as JWTPayLoad;

    const user = await User.findById({ _id: userID });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    await User.findByIdAndDelete({ _id: userID });

    res.status(200).json({ message: "successfully deleted user" });
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
};
