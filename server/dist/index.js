"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 7000;
app.get("/", (req, res) => {
    res.send("It's working....✅");
});
app.listen(PORT, () => console.log(`server is runnig on ${PORT}`));
