import mongoose from "mongoose";

const shippingFeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    minOrderValue: {
        type: Number,
        required: true,
        min: 0
    },
    maxOrderValue: {
        type: Number,
        min: 0,
        validate: {
            validator: function (value) {
                    console.log("VALIDATOR:", {
        maxOrderValue: value,
        minOrderValue: this.minOrderValue
    });
                return value === undefined || value >= this.minOrderValue;
            },
            message: "Maximum order value must be greater than or equal to minimum order value"
        }
    },
    shippingFee: {
        type: Number,
        required: true,
        min: 0
    }
},
    {
        timestamps: true
    });

export default mongoose.models.Shipping || mongoose.model("Shipping", shippingFeeSchema);