import { genrateJwtToken,verifyToken } from "../utils/jwt.js";
import { UserUpload } from "../middleware/upload.middleware.js";
import { getUserController,updateUserController,updateUserByUserController ,getUserByIdController} from "../controllers/user.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import asyncHandler from "../middleware/asyncHandler.js";


import express from  "express";
const router=express.Router();
// admin
router.get("/",protect,authorize("admin"),asyncHandler(getUserController));
router.put("/:id",protect,authorize("admin"),asyncHandler(updateUserController));


// user

router.put("/",protect,authorize("user","admin"),UserUpload.single("image"),asyncHandler(updateUserByUserController));
router.get("/profile",protect,authorize("user","admin"),UserUpload.single("image"),asyncHandler(getUserByIdController));
export default router;

