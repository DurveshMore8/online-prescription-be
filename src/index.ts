import express from "express";
import cors from "cors";
import http from "http";
import { configDotenv } from "dotenv";
import { connectMongo } from "./config/mongo";
import constantRoutes from "./constants/routes";
import userRoutes from "./modules/user/user_routes";
import consultationRoutes from "./modules/consultation/consultation_routes";

configDotenv();

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

connectMongo();

app.use(constantRoutes);
app.use("/user", userRoutes);
app.use("/consultation", consultationRoutes);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
