import { genrateJwtToken,verifyToken } from "../utils/jwt.js";
import { registercontroller,loginController } from "../controllers/auth.controller.js";
import asyncHandler from "../middleware/asyncHandler.js";
import express from  "express";
const router=express.Router();

router.post("/register",asyncHandler(registercontroller))
router.post("/login",asyncHandler(loginController))

export default router;

