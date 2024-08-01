import { Router } from "express";
import UserController from "./user_controller";
import userMiddleware from "../../middleware/user_middleware";

const userRoutes = Router();

// create new doctor
userRoutes.post("/doctor", UserController.createDoctor);

// user login
userRoutes.post("/login", UserController.login);

// get doctor list
userRoutes.get("/doctor-list", userMiddleware, UserController.getDoctorList);

// get doctor by id
userRoutes.get("/doctor/:id", userMiddleware, UserController.getDoctorById);

// get single user (doctor or patient) by token
userRoutes.get("/user-by-token", userMiddleware, UserController.getUserByToken);

// create patient
userRoutes.post("/patient", UserController.createPatient);

export default userRoutes;
