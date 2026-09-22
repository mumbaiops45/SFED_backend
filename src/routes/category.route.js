import { createCategoryController,getCategoryController,updateCategoryController,deleteCategoryController } from "../controllers/category.controller.js";
import { categoryUpload } from "../middleware/upload.middleware.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

import express from  "express";
const router=express.Router();

router.post("/",protect, authorize("admin"),categoryUpload.single("image"),asyncHandler(createCategoryController))
router.get("/",asyncHandler(getCategoryController))
router.put("/:id",protect, authorize("admin"),categoryUpload.single("image"),asyncHandler(updateCategoryController))
router.delete("/:id",protect, authorize("admin"),asyncHandler(deleteCategoryController))

export default router;

