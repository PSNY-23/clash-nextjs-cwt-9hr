import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (to: string, subject: string, body: string) => {
    try {
      const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to,
        subject,
        html: body,
      });
      console.log(info)
      console.log(`Email sent: ${info.messageId}`);
      return info; // Return info for logging or debugging
    } catch (error) {
      console.error(`Error sending email: ${error}`);
      throw error; // Rethrow error for further handling
    }
  };


