import { Request, Response } from "express";
import { Router } from "express";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "welcome to Project Manager API" });
});

router.get("*", (req: Request, res: Response) => {
  res.status(404).send({ message: "This route does not exist!" });
});
