import { Response } from "express";
import Message from "../config/message";

const errorHandling = (e: any, res: Response) => {
  if (e instanceof Message) {
    res.status(e.statusCode).json(e);
  } else if (e instanceof Error) {
    return res.status(500).json({ statusCode: 500, message: e.message });
  } else {
    return res
      .status(500)
      .json({ statusCode: 500, message: "Internal Server Error." });
  }
};

export { errorHandling };
