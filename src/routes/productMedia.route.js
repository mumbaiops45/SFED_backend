import { createProductMediaController,getProductMediaController,updateProductMediaByIdController ,deleteProductMediaByIdController} from "../controllers/productMedia.controller.js";
import { productUpload } from "../middleware/upload.middleware.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import asyncHandler from "../middleware/asyncHandler.js";

import express from  "express";
const router=express.Router();

router.post("/",protect,authorize("admin"),productUpload.single("image"),asyncHandler(createProductMediaController))
router.get("/:productId",asyncHandler(getProductMediaController))
router.put("/:id",protect,authorize("admin"),productUpload.single("image"),asyncHandler(updateProductMediaByIdController))
router.delete("/:id",protect,authorize("admin"),asyncHandler(deleteProductMediaByIdController))

export default router;

