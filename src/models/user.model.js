import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select:false

    },
    image: {
        type: String,
        default: ""
    },
    isBlock: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);