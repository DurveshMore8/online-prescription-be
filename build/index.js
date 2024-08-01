"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = require("dotenv");
const mongo_1 = require("./config/mongo");
const routes_1 = __importDefault(require("./constants/routes"));
const user_routes_1 = __importDefault(require("./modules/user/user_routes"));
const consultation_routes_1 = __importDefault(require("./modules/consultation/consultation_routes"));
(0, dotenv_1.configDotenv)();
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
(0, mongo_1.connectMongo)();
app.use(routes_1.default);
app.use("/user", user_routes_1.default);
app.use("/consultation", consultation_routes_1.default);
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
