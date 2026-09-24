import express from "express";

import {
    createUserPaymentController,
    verifyUserPaymentController
} from "../controllers/payment.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/create",
    protect,
    createUserPaymentController
);

router.post(
    "/verify",
    protect,
    verifyUserPaymentController
);

export default router;