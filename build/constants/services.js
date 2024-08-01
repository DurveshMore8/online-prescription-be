"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = void 0;
const message_1 = __importDefault(require("../config/message"));
const errorHandling = (e, res) => {
    if (e instanceof message_1.default) {
        res.status(e.statusCode).json(e);
    }
    else if (e instanceof Error) {
        return res.status(500).json({ statusCode: 500, message: e.message });
    }
    else {
        return res
            .status(500)
            .json({ statusCode: 500, message: "Internal Server Error." });
    }
};
exports.errorHandling = errorHandling;
