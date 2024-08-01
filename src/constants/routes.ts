import { Request, Response, Router } from "express";

const constantRoutes = Router();

constantRoutes.get("/", (req: Request, res: Response) => {
  res.json({ version: "1.0", message: "Server is up and running." });
});

constantRoutes.get("/health", (req: Request, res: Response) => {
  res.json({ version: "1.0", message: "Server is healthy, up and running." });
});

export default constantRoutes;
