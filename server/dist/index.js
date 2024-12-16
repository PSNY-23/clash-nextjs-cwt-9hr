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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 7000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Set VIEW engine
app.set("view engine", "ejs");
app.set("views", path_1.default.resolve(__dirname, "./views"));
const data = {
    userName: "John Doe",
    companyName: "MyWebsite", // Company name
    actionUrl: "https://mywebsite.com/start", // URL for the CTA button
    unsubscribeUrl: "https://mywebsite.com/unsubscribe", // Unsubscribe URL
};
app.use(index_1.default);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Define the data object to be used in the EJS template
        const data = {
            userName: "John Doe",
            companyName: "MyWebsite",
            actionUrl: "https://mywebsite.com/start",
            unsubscribeUrl: "https://mywebsite.com/unsubscribe",
        };
        // Render the EJS template to a string
        const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "views/emails/welcome.ejs"), data);
        // // Send the email
        // await sendEmail(
        //   "pevoca4385@lofiey.com",
        //   "Testing for Nodemailer Working",
        //   html
        // );
        yield EmailJob_1.emailQueue.add(EmailJob_1.emailQueueName, {
            to: "pevoca4385@lofiey.com",
            subject: "Testinf ro nodemailer working",
            body: html,
        });
        // Respond with the rendered HTML
        res.json({ message: "Email sent successfully." });
    }
    catch (error) {
        console.error("Error in email or rendering:", error);
        res.status(500).send("An error occurred while sending the email.");
    }
}));
//Queue:
require("./jobs/index");
const EmailJob_1 = require("./jobs/EmailJob");
app.listen(PORT, () => console.log(`server is runnig on ${PORT}`));
