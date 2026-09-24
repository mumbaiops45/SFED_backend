import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    sku: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    _id: false
})
const shippingAddressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    landmark: {
        type: String,
        default: ""
    }
}, {
    _id: false
});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [itemSchema],
    shippingAddress: shippingAddressSchema,
    subTotal: {
        type: Number,
        required: true,
        min: 0
    },
    shippingFee: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    total: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: [
            "PENDING_PAYMENT",
            "CONFIRMED",
            "PROCESSING",
            "SHIPPED",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "CANCELLED"
        ],
        default: "PENDING_PAYMENT"
    },

 paymentStatus: {
    type: String,
    enum: [
        "UNPAID",
        "PAID",
        "REFUNDED"
    ],
    default: "UNPAID"
},
razorpayOrderId: {
    type: String,
    default: ""
},
}, {
    timestamps: true
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);