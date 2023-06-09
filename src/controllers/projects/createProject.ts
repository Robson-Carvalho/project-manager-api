import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";

import { User } from "../../models/User";
import { Project } from "../../models/Project";

interface IProject {
  title: string;
  description: string;
  status: boolean;
  technologies: Array<string>;
  url_image: string;
  url_github: string;
}

import { JWTPayLoad } from "../../types/JWTPayLoad";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { authorization }: IncomingHttpHeaders = req.headers;
    const {
      title,
      description,
      status,
      technologies,
      url_image,
      url_github,
    }: IProject = req.body;

    if (!authorization) {
      return res.status(401).json({ message: "not authorized" });
    }

    if (!title) {
      return res.status(400).json({
        message: "title is required",
      });
    }

    if (!technologies) {
      return res.status(400).json({
        message: "at least one technology is required",
      });
    }

    const token = authorization.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY;
    const { userID } = jwt.verify(token, secretKey!) as JWTPayLoad;

    const user = User.findById({ _id: userID });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const project = await Project.findOne({ title: title });

    if (project) {
      return res.status(400).json({
        message:
          "a project with this title already exists in your projects list! Please choose another name.",
      });
    }

    await Project.create({
      title,
      description,
      status,
      technologies,
      url_image,
      url_github,
      user_id: userID,
    });

    res.status(201).json({
      message: "project successfully registered",
    });
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
};
