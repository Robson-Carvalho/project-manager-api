import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";

import { Project } from "../../models/Project";
import { User } from "../../models/User";

import { JWTPayLoad } from "../../types/JWTPayLoad";

export const privateProjects = async (req: Request, res: Response) => {
  try {
    const { authorization }: IncomingHttpHeaders = req.params;

    if (!authorization) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const { userID } = jwt.verify(authorization, secretKey!) as JWTPayLoad;

    const user = User.findById({ _id: userID });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const projects = await Project.find({ user_id: userID });

    res.status(200).json({ data: projects });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
