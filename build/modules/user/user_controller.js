"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../constants/services");
const mongo_1 = require("../../config/mongo");
const message_1 = __importDefault(require("../../config/message"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
class UserController {
}
_a = UserController;
UserController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield mongo_1.client
            .db("main")
            .collection("auth")
            .findOne({ $or: [{ email: username }, { phoneNumber: username }] });
        if (!user) {
            throw new message_1.default(404, "User with this credentials not found.");
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new message_1.default(401, "Incorrect password.");
        }
        const jwtAuthKey = process.env.JWT_AUTH_KEY || "";
        const authToken = jsonwebtoken_1.default.sign({
            email: user.email,
            phoneNumber: user.phoneNumber,
            type: user.type,
        }, jwtAuthKey);
        res.json({ authToken, type: user.type });
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
UserController.createDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileImage, name, speciality, email, phoneNumber, experience, password, } = req.body;
        const isUser = yield mongo_1.client
            .db("main")
            .collection("auth")
            .findOne({ $or: [{ email }, { phoneNumber }] });
        if (isUser) {
            if (email === isUser.email) {
                throw new message_1.default(409, "User with this email already exist.");
            }
            else if (phoneNumber === isUser.phoneNumber) {
                throw new message_1.default(409, "User with this phone number already exist.");
            }
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 8);
        yield mongo_1.client.db("main").collection("doctor").insertOne({
            name,
            speciality,
            email,
            phoneNumber,
            experience,
            profileImage,
        });
        yield mongo_1.client.db("main").collection("auth").insertOne({
            email,
            phoneNumber,
            password: hashedPassword,
            type: "doctor",
        });
        const message = {
            statusCode: 200,
            message: "Doctor creation successful.",
        };
        res.json(message);
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
UserController.getDoctorList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield mongo_1.client
            .db("main")
            .collection("doctor")
            .find({})
            .toArray();
        res.json({ doctors });
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
UserController.getDoctorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const doctor = yield mongo_1.client
            .db("main")
            .collection("doctor")
            .findOne({ _id: new mongodb_1.ObjectId(id) });
        res.json(doctor);
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
UserController.getUserByToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const authToken = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.decode(authToken);
        const user = yield mongo_1.client
            .db("main")
            .collection(decodedToken.type)
            .findOne({
            $and: [
                { email: decodedToken.email },
                { phoneNumber: decodedToken.phoneNumber },
            ],
        }, { projection: { _id: 0 } });
        res.json(user);
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
UserController.createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, email, phoneNumber, surgery, illness, password, profileImage, } = req.body;
        const isUser = yield mongo_1.client
            .db("main")
            .collection("auth")
            .findOne({ $or: [{ email }, { phoneNumber }] });
        if (isUser) {
            if (email === isUser.email) {
                throw new message_1.default(409, "User with this email already exist.");
            }
            else if (phoneNumber === isUser.phoneNumber) {
                throw new message_1.default(409, "User with this phone number already exist.");
            }
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 8);
        yield mongo_1.client.db("main").collection("patient").insertOne({
            name,
            age,
            email,
            phoneNumber,
            surgery,
            illness,
            profileImage,
        });
        yield mongo_1.client.db("main").collection("auth").insertOne({
            email,
            phoneNumber,
            password: hashedPassword,
            type: "patient",
        });
        const message = {
            statusCode: 200,
            message: "Patient creation successful.",
        };
        res.json(message);
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
exports.default = UserController;
