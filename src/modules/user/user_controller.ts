import { Request, Response } from "express";
import { errorHandling } from "../../constants/services";
import { Doctor } from "../../types/doctor";
import { client } from "../../config/mongo";
import Message from "../../config/message";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

class UserController {
  static login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await client
        .db("main")
        .collection("auth")
        .findOne({ $or: [{ email: username }, { phoneNumber: username }] });

      if (!user) {
        throw new Message(404, "User with this credentials not found.");
      }

      const isPasswordCorrect: boolean = await bcrypt.compare(
        password,
        user.password
      );

      if (!isPasswordCorrect) {
        throw new Message(401, "Incorrect password.");
      }

      const jwtAuthKey: string = process.env.JWT_AUTH_KEY || "";

      const authToken: string = jwt.sign(
        {
          email: user.email,
          phoneNumber: user.phoneNumber,
          type: user.type,
        },
        jwtAuthKey
      );

      res.json({ authToken, type: user.type });
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static createDoctor = async (req: Request, res: Response) => {
    try {
      const {
        profileImage,
        name,
        speciality,
        email,
        phoneNumber,
        experience,
        password,
      } = req.body;

      const isUser = await client
        .db("main")
        .collection("auth")
        .findOne({ $or: [{ email }, { phoneNumber }] });

      if (isUser) {
        if (email === isUser.email) {
          throw new Message(409, "User with this email already exist.");
        } else if (phoneNumber === isUser.phoneNumber) {
          throw new Message(409, "User with this phone number already exist.");
        }
      }

      const hashedPassword: string = await bcrypt.hash(password, 8);

      await client.db("main").collection("doctor").insertOne({
        name,
        speciality,
        email,
        phoneNumber,
        experience,
        profileImage,
      });

      await client.db("main").collection("auth").insertOne({
        email,
        phoneNumber,
        password: hashedPassword,
        type: "doctor",
      });

      const message: Message = {
        statusCode: 200,
        message: "Doctor creation successful.",
      };

      res.json(message);
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static getDoctorList = async (req: Request, res: Response) => {
    try {
      const doctors: Doctor[] = await client
        .db("main")
        .collection<Doctor>("doctor")
        .find({})
        .toArray();

      res.json({ doctors });
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static getDoctorById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      const doctor = await client
        .db("main")
        .collection("doctor")
        .findOne({ _id: new ObjectId(id) });

      res.json(doctor);
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static getUserByToken = async (req: Request, res: Response) => {
    try {
      const authToken: string | undefined =
        req.headers.authorization?.split(" ")[1];

      const decodedToken: jwt.JwtPayload = jwt.decode(
        authToken!
      ) as jwt.JwtPayload;

      const user = await client
        .db("main")
        .collection(decodedToken.type)
        .findOne(
          {
            $and: [
              { email: decodedToken.email },
              { phoneNumber: decodedToken.phoneNumber },
            ],
          },
          { projection: { _id: 0 } }
        );

      res.json(user);
    } catch (e) {
      errorHandling(e, res);
    }
  };

  static createPatient = async (req: Request, res: Response) => {
    try {
      const {
        name,
        age,
        email,
        phoneNumber,
        surgery,
        illness,
        password,
        profileImage,
      } = req.body;

      const isUser = await client
        .db("main")
        .collection("auth")
        .findOne({ $or: [{ email }, { phoneNumber }] });

      if (isUser) {
        if (email === isUser.email) {
          throw new Message(409, "User with this email already exist.");
        } else if (phoneNumber === isUser.phoneNumber) {
          throw new Message(409, "User with this phone number already exist.");
        }
      }

      const hashedPassword: string = await bcrypt.hash(password, 8);

      await client.db("main").collection("patient").insertOne({
        name,
        age,
        email,
        phoneNumber,
        surgery,
        illness,
        profileImage,
      });

      await client.db("main").collection("auth").insertOne({
        email,
        phoneNumber,
        password: hashedPassword,
        type: "patient",
      });

      const message: Message = {
        statusCode: 200,
        message: "Patient creation successful.",
      };

      res.json(message);
    } catch (e) {
      errorHandling(e, res);
    }
  };
}

export default UserController;
