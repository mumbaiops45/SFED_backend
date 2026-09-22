import ProductMedia from "../models/productMedia.model.js";
import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";


export const createProductMediaService = async (data) => {
    const product = await Product.findById(data.product)
    if (!product) {
        throw new Error("product not found");

    }

    data.isPrimary = data.isPrimary === "true";
    const productmidia = await ProductMedia.create(data);
    return {
        message: "Product media created",
        productmidia
    }
}

export const getProductMediaService = async (productId) => {
    const productMedia = await ProductMedia.find({ product: productId }).sort({ sorsortOrder: 1 });
    return {
        message: "All product",
        data: {
            productMedia
        }
    }
}

export const updateProductMediaByIdService = async (Id, data) => {
    const oldProductMedia = await ProductMedia.findById(Id);
    if (!oldProductMedia) {
        throw new Error("This Product Media not exist");

    };

    if (data.product) {
        throw new Error("you can't update the product");
    }
    const oldimagePublicId = oldProductMedia.publicId;
    const productMedia = await ProductMedia.findByIdAndUpdate(Id, data, {
        new: true,
        runValidators: true
    });
    if (data.url && oldimagePublicId) {
        await cloudinary.uploader.destroy(oldimagePublicId)
    };
    return {
        message: "product Media updated",
        data: {
            productMedia
        }
    }
}

export const deleteProductMediaByIdService = async (id) => {
    const productMedia = await ProductMedia.findByIdAndDelete(id)
    if (!productMedia) {
        throw new Error("productMedia not found");
        
    }
    return{
        message:"product media deleted",
        data:{
            productMedia
        }
    }
}




