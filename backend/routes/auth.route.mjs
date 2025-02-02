import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.mjs";


const router = Router();


router.post("api/v1/signup", signup);


router.post("api/v1/login", login);


router.post("api/v1/logout", logout);

export default router;