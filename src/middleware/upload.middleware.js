import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { getCloudinary } from "../config/cloudinary.js";

const createUpload = (folder) => {

    const storage = new CloudinaryStorage({
        cloudinary: getCloudinary(),
        params: {
            folder,
            allowed_formats: [
                "jpg",
                "jpeg",
                "png",
                "webp",
                "mp4",
                "mov",
                "webm"
            ]
        }
    });

    return multer({ storage });
};

export const categoryUpload = createUpload("sfed/category");

export const productUpload = createUpload("sfed/product");