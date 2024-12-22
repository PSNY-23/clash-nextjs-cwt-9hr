import { Router, Request, Response } from "express";
import { registerSchema } from "../validation/authValidation";
import { ZodError } from "zod";
import { formatError, renderEmailEJS } from "../helper";
import prisma from "../config/database";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/EmailJob";

const router = Router();

//Register routes:
router.post("/register", async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);
    let user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (user) {
      return res.status(422).json({
        errors: {
          email:
            "Email already Exists, Please signin or use another email to register",
        },
      });
    }

    //Bcrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);
    payload.password = hashedPassword;

    const token = await bcrypt.hash(uuid4(), salt);
    const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;
    const emailBody = await renderEmailEJS("verify-email", {
      name: payload.name,
      url: url,
    });

    //send email
    await emailQueue.add(emailQueueName, {
      to: payload.email,
      subject: "Clash Email verification",
      body: emailBody,
    });

    let registeredUser = await prisma.user.create({
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
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = formatError(error);
      return res.status(422).json({ message: "Invalid Data", errors });
    }
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again!." });
  }
});

export default router;
