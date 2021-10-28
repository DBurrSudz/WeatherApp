import { Router } from "express";
import { authenticate, register } from "../controllers/user.js";

const router = Router();

//Sign In Router
router.post("/auth", authenticate);
//Registration Router
router.post("/register", register);


export default router;