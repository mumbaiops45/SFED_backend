import { createOrdercontroller,getOrdercontroller,updateOrderByCustomerController,updateOrderByAdminController } from "../controllers/order.controller.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

import express from  "express";
const router=express.Router();

router.post("/",protect, authorize("user"),asyncHandler(createOrdercontroller))
router.get("/",protect, authorize("user","admin"),asyncHandler(getOrdercontroller))
router.put("/:orderId/cancel",protect, authorize("user"),asyncHandler(updateOrderByCustomerController)
);

router.put("/:orderId/admin",protect, authorize("admin"),asyncHandler(updateOrderByAdminController)
);
export default router;

