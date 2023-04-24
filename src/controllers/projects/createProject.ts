import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../../models/User";
import { Project } from "../../models/Project";

interface JWTPayLoad {
  id: number;
}

export const createProject = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    const { title, description, status, technologies, url_image, url_github } =
      req.body;

    if (!authorization) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!technologies) {
      res.status(400).json({
        message: "At least one technology is required",
      });
      return;
    }

    const token = authorization.split(" ")[1];

    const secretKey = process.env.JWT_SECRET_KEY;
    const { id } = jwt.verify(token, secretKey!) as JWTPayLoad;

    const user = User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const projects = await Project.find({ user_id: id });

    if (projects) {
      const existProject = projects.filter(
        (project) => project.title === title
      );

      if (existProject.length !== 0) {
        return res.status(400).json({
          message:
            "A project with this name already exists in your projects list! Please choose another name.",
        });
      }
    }

    await Project.create({
      title,
      description,
      status,
      technologies,
      url_image,
      url_github,
      user_id: id,
    });

    res.status(201).json({
      message: "Project successfully registered",
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
