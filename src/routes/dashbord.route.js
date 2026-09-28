import { getDashboardController } from "../controllers/dashbord.controller.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

import express from  "express";
const router=express.Router();

router.get("/",protect, authorize("admin"),asyncHandler(getDashboardController))

export default router;

