import { Router } from "express";
import {
  createSession,
  refreshSession,
  registerUser,
} from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", createSession);
authRouter.post("/refreshToken", refreshSession);
