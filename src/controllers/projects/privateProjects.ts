import { Request, Response } from "express";
import { Project } from "../../models/Project";
import jwt from "jsonwebtoken";

import { User } from "../../models/User";
import { JWTPayLoad } from "../../types/JWTPayLoad";

export const privateProjects = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authorization.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY;
    const { id } = jwt.verify(token, secretKey!) as JWTPayLoad;

    const user = User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const projects = await Project.find({ user_id: id });

    res.status(200).json({ data: projects });
  } catch (err) {
    res.status(5000).json({ message: err });
  }
};
