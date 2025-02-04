import { Router } from "express";
import { login, logout, signup } from "../controllers/authController.mjs";
import { loginValidation, signupValidation } from "../validation/authValidation.mjs";
import { validate } from "../middlewares/validateMiddleware.mjs";


const router = Router();

router.post("/signup", [signupValidation, validate], signup);

router.post("/login", [loginValidation, validate], login);

router.get("/logout", logout);

export default router;