import express from "express"
import { createBannerController,getBannerController,getBannerByIdController,updateBannerByIdController,deleteBannerByIdController } from "../controllers/banner,controller.js";
import { protect,authorize } from "../middleware/auth.middleware.js";
import { BannerUpload } from "../middleware/upload.middleware.js";

import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/",protect,authorize("admin"),BannerUpload.single("image"),asyncHandler(createBannerController))
router.get("/",asyncHandler(getBannerController))
router.get("/:id",asyncHandler(getBannerByIdController))
router.put("/:id",protect,authorize("admin"),BannerUpload.single("image"),asyncHandler(updateBannerByIdController))
router.delete("/:id",protect,authorize("admin"),asyncHandler(deleteBannerByIdController))

export default router;
