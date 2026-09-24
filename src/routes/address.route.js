import { createAdressController,updateAdressByIdController ,getAdressController ,getAdressByIdController,deleteAdressByIdController} from "../controllers/address.controller.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import express from  "express";
const router=express.Router();

router.post("/",protect, authorize("user"),asyncHandler(createAdressController))
router.get("/",protect, authorize("user"),asyncHandler(getAdressController))
router.get("/:id",protect, authorize("user"),asyncHandler(getAdressByIdController))
router.put("/:id",protect, authorize("user"),asyncHandler(updateAdressByIdController))
router.delete("/:id",protect, authorize("user"),asyncHandler(deleteAdressByIdController))
export default router;

