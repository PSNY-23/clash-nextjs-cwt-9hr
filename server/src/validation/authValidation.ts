import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ message: "name is required." })
      .min(3, { message: "name must be atleast 3 character long." }),
    email: z
      .string({ message: "email is required." })
      .email({ message: "Email must be in valid." }),
    password: z
      .string({ message: "Password is required." })
      .min(6, { message: "Password must be atleast 6 character long." }),
    confirmPassword: z
      .string({ message: "Password is required." })
      .min(6, { message: "Password must be atleast 6 character long." }),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Confirm Password didn't match.",
    path: ["confirmPassowrd"],
  });
