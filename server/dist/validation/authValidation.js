"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z
    .object({
    name: zod_1.z
        .string({ message: "name is required." })
        .min(3, { message: "name must be atleast 3 character long." }),
    email: zod_1.z
        .string({ message: "email is required." })
        .email({ message: "Email must be in valid." }),
    password: zod_1.z
        .string({ message: "Password is required." })
        .min(6, { message: "Password must be atleast 6 character long." }),
    confirmPassword: zod_1.z
        .string({ message: "Password is required." })
        .min(6, { message: "Password must be atleast 6 character long." }),
})
    .refine((data) => data.password == data.confirmPassword, {
    message: "Confirm Password didn't match.",
    path: ["confirmPassowrd"],
});
