import { Request, Response } from "express";
import { errorHandling } from "../../constants/services";
import { client } from "../../config/mongo";
import Message from "../../config/message";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

class ConsultationController {
  static createConsultation = async (req: Request, res: Response) => {
    try {
      const {
        patientName,
        patientEmail,
        patientPhone,
        doctorName,
        doctorEmail,
        doctorPhone,
        illness,
        surgery,
        surgeryTime,
        diabetes,
        allergies,
        others,
        transactionId,
      } = req.body;

      await client.db("main").collection("consultation").insertOne({
        patientName,
        patientEmail,
        patientPhone,
        doctorName,
        doctorEmail,
        doctorPhone,
        illness,
        surgery,
        surgeryTime,
        diabetes,
        allergies,
        others,
        transactionId,
        dateBooked: new Date(),
      });

      const message: Message = {
        statusCode: 200,
        message: "Appointment booked successfully.",
      };

      res.json(message);
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static getPatientCosultation = async (req: Request, res: Response) => {
    try {
      const authToken: string | undefined =
        req.headers.authorization?.split(" ")[1];

      const decodedToken: jwt.JwtPayload = jwt.decode(
        authToken!
      ) as jwt.JwtPayload;

      const consultations = await client
        .db("main")
        .collection("consultation")
        .find({ patientEmail: decodedToken.email })
        .toArray();

      res.json({ consultations });
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static getDoctorConsultation = async (req: Request, res: Response) => {
    try {
      const authToken: string | undefined =
        req.headers.authorization?.split(" ")[1];

      const decodedToken: jwt.JwtPayload = jwt.decode(
        authToken!
      ) as jwt.JwtPayload;

      const consultations = await client
        .db("main")
        .collection("consultation")
        .find({ doctorEmail: decodedToken.email })
        .toArray();

      res.json({ consultations });
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static getConsultationById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      const consultation = await client
        .db("main")
        .collection("consultation")
        .findOne({ _id: new ObjectId(id) });

      res.json({ consultation });
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static updateConsultation = async (req: Request, res: Response) => {
    try {
      const { id, careTaken, medicines } = req.body;

      await client
        .db("main")
        .collection("consultation")
        .updateOne(
          { _id: new ObjectId(id) },
          {
            $set: { careTaken, medicines },
          }
        );

      const message: Message = {
        statusCode: 200,
        message: "Prescription updated successfully.",
      };

      res.json(message);
    } catch (e) {
      errorHandling(e, res);
    }
  };
}

export default ConsultationController;
