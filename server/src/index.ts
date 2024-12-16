import express, { Application, Request, Response} from "express";
import "dotenv/config";
import path from "path";
import ejs from "ejs";
import { sendEmail } from "./config/mail";
import Routes from "./routes/index"

const app: Application = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set VIEW engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

const data = {
  userName: "John Doe",
  companyName: "MyWebsite", // Company name
  actionUrl: "https://mywebsite.com/start", // URL for the CTA button
  unsubscribeUrl: "https://mywebsite.com/unsubscribe", // Unsubscribe URL
};

app.use(Routes)

app.get("/", async (req: Request, res: Response) => {
  try {
    // Define the data object to be used in the EJS template
    const data = {
      userName: "John Doe",
      companyName: "MyWebsite",
      actionUrl: "https://mywebsite.com/start",
      unsubscribeUrl: "https://mywebsite.com/unsubscribe",
    };

    // Render the EJS template to a string
    const html = await ejs.renderFile(
      path.join(__dirname, "views/emails/welcome.ejs"),
      data
    );

    // // Send the email
    // await sendEmail(
    //   "pevoca4385@lofiey.com",
    //   "Testing for Nodemailer Working",
    //   html
    // );

    await emailQueue.add(emailQueueName, {
      to: "pevoca4385@lofiey.com",
      subject: "Testinf ro nodemailer working",
      body: html,
    });

    // Respond with the rendered HTML
    res.json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error in email or rendering:", error);
    res.status(500).send("An error occurred while sending the email.");
  }
});

//Queue:
import "./jobs/index";
import { emailQueue, emailQueueName } from "./jobs/EmailJob";
import router from "./routes";

app.listen(PORT, () => console.log(`server is runnig on ${PORT}`));
