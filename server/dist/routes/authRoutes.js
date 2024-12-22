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
const express_1 = require("express");
const authValidation_1 = require("../validation/authValidation");
const zod_1 = require("zod");
const helper_1 = require("../helper");
const database_1 = __importDefault(require("../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const EmailJob_1 = require("../jobs/EmailJob");
const router = (0, express_1.Router)();
//Register routes:
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const payload = authValidation_1.registerSchema.parse(body);
        let user = yield database_1.default.user.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (user) {
            return res.status(422).json({
                errors: {
                    email: "Email already Exists, Please signin or use another email to register",
                },
            });
        }
        //Bcrypt the password
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(payload.password, salt);
        payload.password = hashedPassword;
        const token = yield bcrypt_1.default.hash((0, uuid_1.v4)(), salt);
        const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;
        const emailBody = yield (0, helper_1.renderEmailEJS)("verify-email", {
            name: payload.name,
            url: url,
        });
        //send email
        yield EmailJob_1.emailQueue.add(EmailJob_1.emailQueueName, {
            to: payload.email,
            subject: "Clash Email verification",
            body: emailBody,
        });
        let registeredUser = yield database_1.default.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                email_verify_token: token
            },
        });
        return res.json({
            message: "Please check your email, we have sent you a verification link.",
            registeredUser,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const errors = (0, helper_1.formatError)(error);
            return res.status(422).json({ message: "Invalid Data", errors });
        }
        res
            .status(500)
            .json({ message: "Something went wrong, Please try again!." });
    }
}));
exports.default = router;
