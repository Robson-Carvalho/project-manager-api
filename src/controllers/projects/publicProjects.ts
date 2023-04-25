import { Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

import { Project } from "../../models/Project";
import { User } from "../../models/User";

export const publicProjects = async (req: Request, res: Response) => {
  try {
    const { userID }: IncomingHttpHeaders = req.params;

    if (!userID) {
      return res.status(400).json({
        message: "User id is required",
      });
    }

    const user = await User.findById({ _id: userID });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const projects = await Project.find({ user_id: userID, status: true });

    res.status(200).json({ data: projects });
  } catch (err) {
    res.status(5000).json({ message: err });
  }
};
