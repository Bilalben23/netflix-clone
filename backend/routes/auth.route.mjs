import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.mjs";
import { loginValidation, signupValidation } from "../validation/auth.validation.mjs";
import { validate } from "../middlewares/validate.middleware.mjs";


const router = Router();


router.post("/signup", [signupValidation, validate], signup);


router.post("/login", [loginValidation, validate], login);


router.get("/logout", logout);

export default router;