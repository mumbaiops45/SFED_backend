import {
    createUserPaymentService,
    verifyUserPaymentService
} from "../services/payment.service.js";

export const createUserPaymentController = async (req, res) => {
    const { orderId } = req.body;

    const result = await createUserPaymentService(orderId);

    res.status(200).json({
        success: true,
        ...result
    });
};

export const verifyUserPaymentController = async (req, res) => {
    const result = await verifyUserPaymentService(req.body);

    res.status(200).json({
        success: true,
        ...result
    });
};