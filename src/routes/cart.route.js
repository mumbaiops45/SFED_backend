import { createCartController,getCartByUserController,getAllCartController,updateCartByproductIdController,deleteCartByproductIdController,clearCartController } from "../controllers/cart.controller.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

import express from  "express";
const router=express.Router();

router.post("/",protect, authorize("user"),asyncHandler(createCartController))
router.get("/",protect, authorize("user"),asyncHandler(getCartByUserController))
router.get("/admin",protect, authorize("admin"),asyncHandler(getAllCartController))
router.put("/:productId",protect, authorize("user"),asyncHandler(updateCartByproductIdController))
router.delete("/:productId",protect, authorize("user"),asyncHandler(deleteCartByproductIdController));
router.delete("/",protect, authorize("user"),asyncHandler(clearCartController))

export default router;

