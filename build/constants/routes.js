"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constantRoutes = (0, express_1.Router)();
constantRoutes.get("/", (req, res) => {
    res.json({ version: "1.0", message: "Server is up and running." });
});
constantRoutes.get("/health", (req, res) => {
    res.json({ version: "1.0", message: "Server is healthy, up and running." });
});
exports.default = constantRoutes;
