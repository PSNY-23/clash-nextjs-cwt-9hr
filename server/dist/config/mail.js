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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});
const sendEmail = (to, subject, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield exports.transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to,
            subject,
            html: body,
        });
        console.log(info);
        console.log(`Email sent: ${info.messageId}`);
        return info; // Return info for logging or debugging
    }
    catch (error) {
        console.error(`Error sending email: ${error}`);
        throw error; // Rethrow error for further handling
    }
});
exports.sendEmail = sendEmail;
