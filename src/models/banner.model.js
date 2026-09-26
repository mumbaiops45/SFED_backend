import mongoose from "mongoose";
const bannerSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Hero", "middle"],
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    urlPublicId: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true
    },
    title1: {
        type: String,
        default: "",
        trim: true
    },
    title2: {
        type: String,
        default: "",
        trim: true
    },
    color1: {
        type: String,
        default: "#ffffff"
    },
    color2: {
        type: String,
        default: "#ffffff"
    },
    isActive: {
        type: Boolean,
        default: true
    }



},
    {
        timestamps: true
    })

bannerSchema.index(
    { type: 1, order: 1 },
    { unique: true }
);

export default mongoose.models.Banner || mongoose.model("Banner", bannerSchema);