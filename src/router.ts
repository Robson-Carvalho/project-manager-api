import { Request, Response } from "express";
import { Router } from "express";

import { createUser } from "./controllers/users/createUser";
import { authLogin } from "./controllers/users/authLogin";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "welcome to Project Manager API" });
});

router.post("/createUser", createUser);

router.post("/auth/login", authLogin);

router.get("*", (req: Request, res: Response) => {
  res.status(404).send({ message: "This route does not exist!" });
});
