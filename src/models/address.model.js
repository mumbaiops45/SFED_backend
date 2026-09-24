import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        default: "",
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    pincode: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        default: "India",
        trim: true
    },
    landmark: {
        type: String,
        trim: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

export default mongoose.models.Address || mongoose.model("Address", addressSchema)