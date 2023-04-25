import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";

import { User } from "../../models/User";
import { Project } from "../../models/Project";

import { JWTPayLoad } from "../../types/JWTPayLoad";

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { authorization }: IncomingHttpHeaders = req.headers;
    const { projectID } = req.body;

    if (!authorization) {
      return res.status(401).json({ message: "not authorized" });
    }

    if (!projectID) {
      return res.status(400).json({
        message: "project ID is required",
      });
    }

    const token = authorization.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY;
    const { userID } = jwt.verify(token, secretKey!) as JWTPayLoad;

    const user = await User.findById({ _id: userID });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const project = await Project.findById({ _id: projectID });

    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }

    await Project.findByIdAndDelete({ _id: projectID });

    res.status(200).json({ message: "successfully deleted project" });
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
};
