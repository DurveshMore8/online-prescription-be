"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = __importDefault(require("../../middleware/user_middleware"));
const consultation_controller_1 = __importDefault(require("./consultation_controller"));
const consultationRoutes = (0, express_1.Router)();
consultationRoutes.post("", user_middleware_1.default, consultation_controller_1.default.createConsultation);
consultationRoutes.get("/patient", user_middleware_1.default, consultation_controller_1.default.getPatientCosultation);
consultationRoutes.get("/doctor", user_middleware_1.default, consultation_controller_1.default.getDoctorConsultation);
consultationRoutes.get("/:id", user_middleware_1.default, consultation_controller_1.default.getConsultationById);
consultationRoutes.post("/update", user_middleware_1.default, consultation_controller_1.default.updateConsultation);
exports.default = consultationRoutes;
