import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";

import { User } from "../../models/User";
import { Project } from "../../models/Project";

import { JWTPayLoad } from "../../types/JWTPayLoad";

interface IUpdateProject {
  projectID: string;
  title: string;
  description: string;
  status: string;
  technologies: Array<string>;
  url_image: String;
  url_github: String;
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { authorization }: IncomingHttpHeaders = req.headers;
    const {
      projectID,
      title,
      description,
      status,
      technologies,
      url_image,
      url_github,
    }: IUpdateProject = req.body;

    if (!authorization) {
      return res.status(401).json({ message: "not authorized" });
    }

    if (!projectID) {
      return res.status(400).json({
        message: "project id is required",
      });
    }

    if (!title) {
      return res.status(400).json({
        message: "title is required",
      });
    }

    if (!description) {
      return res.status(400).json({
        message: "description is required",
      });
    }

    if (!status) {
      return res.status(400).json({
        message: "status is required",
      });
    }

    if (!technologies) {
      return res.status(400).json({
        message: "at least one technology is required",
      });
    }

    if (!url_image) {
      return res.status(400).json({
        message: "url_image is required",
      });
    }

    if (!url_github) {
      return res.status(400).json({
        message: "url_github is required",
      });
    }

    const token = authorization.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY;
    const { userID } = jwt.verify(token, secretKey!) as JWTPayLoad;

    const user = await User.findOne({ _id: userID });

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

    await Project.findByIdAndUpdate(projectID, {
      title,
      description,
      status,
      technologies,
      url_image,
      url_github,
    });

    res
      .status(200)
      .json({ message: "project information changed successfully" });
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
};
