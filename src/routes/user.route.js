import { genrateJwtToken,verifyToken } from "../utils/jwt.js";
import { updateUserController } from "../controllers/user.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import asyncHandler from "../middleware/asyncHandler.js";


import express from  "express";
const router=express.Router();

router.put("/:id",protect,authorize("admin"),asyncHandler(updateUserController))


export default router;

