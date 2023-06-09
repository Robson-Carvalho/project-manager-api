import { Request, Response } from "express";
import { Router } from "express";

import { createUser } from "./controllers/users/createUser";
import { login } from "./controllers/auth/login";
import { updateUser } from "./controllers/users/updateUser";
import { passwordRecovery } from "./controllers/auth/passwordRecovery";
import { recoveringPassword } from "./controllers/auth/recoveringPassword";
import { deleteUser } from "./controllers/users/deleteUser";
import { createProject } from "./controllers/projects/createProject";
import { publicProjects } from "./controllers/projects/publicProjects";
import { deleteProject } from "./controllers/projects/deleteProject";
import { privateProjects } from "./controllers/projects/privateProjects";
import { updateProject } from "./controllers/projects/updateProject";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "welcome to Project Manager API" });
});

router.post("/login", login);

router.post("/password/recovery", passwordRecovery);

router.patch("/recovering/password", recoveringPassword);

router.post("/user/create", createUser);

router.put("/user/update", updateUser);

router.delete("/user/delete", deleteUser);

router.post("/create/project", createProject);

router.get("/projects/:userID/public", publicProjects);

router.get("/projects/:authorization/private", privateProjects);

router.delete("/project/delete", deleteProject);

router.put("project/update", updateProject);

router.get("*", (req: Request, res: Response) => {
  res.status(404).send({ message: "this route does not exist!" });
});
