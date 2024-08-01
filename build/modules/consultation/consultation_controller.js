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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
class ConsultationController {
}
_a = ConsultationController;
ConsultationController.createConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientName, patientEmail, patientPhone, doctorName, doctorEmail, doctorPhone, illness, surgery, surgeryTime, diabetes, allergies, others, transactionId, } = req.body;
        yield mongo_1.client.db("main").collection("consultation").insertOne({
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
        const message = {
            statusCode: 200,
            message: "Appointment booked successfully.",
        };
        res.json(message);
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
ConsultationController.getPatientCosultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const authToken = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.decode(authToken);
        const consultations = yield mongo_1.client
            .db("main")
            .collection("consultation")
            .find({ patientEmail: decodedToken.email })
            .toArray();
        res.json({ consultations });
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
ConsultationController.getDoctorConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const authToken = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.decode(authToken);
        const consultations = yield mongo_1.client
            .db("main")
            .collection("consultation")
            .find({ doctorEmail: decodedToken.email })
            .toArray();
        res.json({ consultations });
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
ConsultationController.getConsultationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const consultation = yield mongo_1.client
            .db("main")
            .collection("consultation")
            .findOne({ _id: new mongodb_1.ObjectId(id) });
        res.json({ consultation });
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
ConsultationController.updateConsultation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, careTaken, medicines } = req.body;
        yield mongo_1.client
            .db("main")
            .collection("consultation")
            .updateOne({ _id: new mongodb_1.ObjectId(id) }, {
            $set: { careTaken, medicines },
        });
        const message = {
            statusCode: 200,
            message: "Prescription updated successfully.",
        };
        res.json(message);
    }
    catch (e) {
        (0, services_1.errorHandling)(e, res);
    }
});
exports.default = ConsultationController;
