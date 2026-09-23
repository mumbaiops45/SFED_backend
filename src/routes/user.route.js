import { genrateJwtToken,verifyToken } from "../utils/jwt.js";
import { getUserController,updateUserController } from "../controllers/user.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import asyncHandler from "../middleware/asyncHandler.js";


import express from  "express";
const router=express.Router();

router.get("/",protect,authorize("admin"),asyncHandler(getUserController));
router.put("/:id",protect,authorize("admin"),asyncHandler(updateUserController));


export default router;

