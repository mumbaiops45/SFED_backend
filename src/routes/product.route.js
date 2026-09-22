import { createProductController,getProductController,updateProductController,deleteProductController } from "../controllers/product.controller.js";

import asyncHandler from "../middleware/asyncHandler.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import express from "express";

const router= express.Router();

router.post("/",protect,authorize("admin"),asyncHandler(createProductController));
router.get("/",asyncHandler(getProductController));
router.put("/:id",protect, authorize("admin"),asyncHandler(updateProductController));
router.delete("/:id",protect, authorize("admin"),asyncHandler(deleteProductController));

export default router;