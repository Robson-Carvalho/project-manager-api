import { Request, Response } from "express";
import { Project } from "../../models/Project";
import { User } from "../../models/User";

export const publicProjects = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    if (!userID) {
      return res.status(400).json({
        message: "User id is required",
      });
    }

    const user = await User.findById({ _id: userID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { _id } = user;

    const projects = await Project.find({ user_id: _id, status: true });

    res.status(200).json({ data: projects });
  } catch (err) {
    res.status(5000).json({ message: err });
  }
};
