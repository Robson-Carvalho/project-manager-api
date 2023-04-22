import { Request, Response } from "express";
import { Router } from "express";

import { createUser } from "./controllers/users/createUser";
import { login } from "./controllers/auth/login";
import { updateUser } from "./controllers/users/updateUser";
import { passwordRecovery } from "./controllers/users/passwordRecovery";
import { recoveringPassword } from "./controllers/users/recoveringPassword";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "welcome to Project Manager API" });
});

router.post("/createUser", createUser);

router.post("/login", login);

router.post("/updateUser", updateUser);

router.post("/passwordRecovery", passwordRecovery);

router.post("/recoveringPassword/:token", recoveringPassword);

router.get("*", (req: Request, res: Response) => {
  res.status(404).send({ message: "This route does not exist!" });
});
