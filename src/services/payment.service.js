import razorpay from "../config/razorpay.js";
import Order from "../models/order.model.js";
import crypto from "crypto";

export const createUserPaymentService = async (orderId) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.paymentStatus === "PAID") {
        throw new Error("Payment already paid");
    }

    if (order.status !== "PENDING_PAYMENT") {
        throw new Error("Order is not available for payment");
    }

    if (!order.total || order.total <= 0) {
        throw new Error("Invalid order amount");
    }

    const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(order.total * 100),
        currency: "INR",
        receipt: order._id.toString()
    });

    order.razorpayOrderId = razorpayOrder.id;

    await order.save();

    return {
        message: "Razorpay order created successfully",
        data: {
            razorpayOrder
        }
    };
};



export const verifyUserPaymentService = async ({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
}) => {
    const order = await Order.findOne({
        razorpayOrderId: razorpay_order_id
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.paymentStatus === "PAID") {
        throw new Error("Payment already verified");
    }

    if (order.status !== "PENDING_PAYMENT") {
        throw new Error("Order is not available for payment");
    }

    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (generatedSignature !== razorpay_signature) {
        throw new Error("Invalid payment signature");
    }

    order.paymentStatus = "PAID";
    order.status = "CONFIRMED";

    await order.save();

    return {
        message: "Payment verified successfully",
        data: {
            order
        }
    };
};