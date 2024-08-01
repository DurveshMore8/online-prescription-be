import { Router } from "express";
import userMiddleware from "../../middleware/user_middleware";
import ConsultationController from "./consultation_controller";

const consultationRoutes = Router();

consultationRoutes.post(
  "",
  userMiddleware,
  ConsultationController.createConsultation
);

consultationRoutes.get(
  "/patient",
  userMiddleware,
  ConsultationController.getPatientCosultation
);

consultationRoutes.get(
  "/doctor",
  userMiddleware,
  ConsultationController.getDoctorConsultation
);

consultationRoutes.get(
  "/:id",
  userMiddleware,
  ConsultationController.getConsultationById
);

consultationRoutes.post(
  "/update",
  userMiddleware,
  ConsultationController.updateConsultation
);

export default consultationRoutes;
