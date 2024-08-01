"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user_controller"));
const user_middleware_1 = __importDefault(require("../../middleware/user_middleware"));
const userRoutes = (0, express_1.Router)();
// create new doctor
userRoutes.post("/doctor", user_controller_1.default.createDoctor);
// user login
userRoutes.post("/login", user_controller_1.default.login);
// get doctor list
userRoutes.get("/doctor-list", user_middleware_1.default, user_controller_1.default.getDoctorList);
// get doctor by id
userRoutes.get("/doctor/:id", user_middleware_1.default, user_controller_1.default.getDoctorById);
// get single user (doctor or patient) by token
userRoutes.get("/user-by-token", user_middleware_1.default, user_controller_1.default.getUserByToken);
// create patient
userRoutes.post("/patient", user_controller_1.default.createPatient);
exports.default = userRoutes;
