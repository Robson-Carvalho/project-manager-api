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

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to Project Manager API" });
});

router.post("/login", login);

router.post("/password/recovery", passwordRecovery);

router.patch("/recovering/password", recoveringPassword);

router.post("/create/user", createUser);

router.put("/update/user", updateUser);

router.delete("/delete/user", deleteUser);

router.post("/create/project", createProject);

router.get("/projects/:userID/public", publicProjects);

router.get("/projects/:userID/public", publicProjects);

router.post("/projects/private", publicProjects);

router.get("*", (req: Request, res: Response) => {
  res.status(404).send({ message: "This route does not exist!" });
});
