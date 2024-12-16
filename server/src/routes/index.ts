import { Router } from "express";
import AuthRoutes from "./authRoutes";

const router = Router();

router.use("/api/auth", AuthRoutes);

export default router;
