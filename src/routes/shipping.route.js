import { createShippingController,getShippingController ,updateShippingByIdController,deleteShippingByIdController } from "../controllers/shipping.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import asyncHandler from "../middleware/asyncHandler.js";

import express from  "express";
const router=express.Router();

router.post("/",protect,authorize("admin"),asyncHandler(createShippingController));
router.get("/",protect,authorize("admin","user"),asyncHandler(getShippingController));
router.put("/:id",protect,authorize("admin"),asyncHandler(updateShippingByIdController));
router.delete("/:id",protect,authorize("admin"),asyncHandler(deleteShippingByIdController));


export default router;

