import Product from "../models/product.model.js";
import Category from "../models/category.model.js";


export const createProductService = async (data) => {
    const category = await Category.findById(data.category);
    if (!category) {
        throw new Error("Category not found");
    }
    const product = await Product.create(data);
    return {
        message: "Product created",
        data: {
            product
        }
    }
}

export const getProductService = async ({ page = 1, limit = 10,price }) => {
    page = Number(page);
    limit = Number(limit);
      price = Number(price);
    const sort ={};
    if (price===1) {
        sort.price=1
    };
     if (price===-1) {
        sort.price=-1
    }
    const skip = (page - 1) * limit;
    const product = await Product.find().skip(skip).limit(limit).sort(sort);
    return {
        message: "All product",
        data: {
            product
        }
    }
}

export const updateProductService = async (id, data) => {
    const category = await Category.findById(data.category);
    if (!category) {
        throw new Error("Category not found");
    }
    const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    })
    if (!product) {
        throw new Error("product not found");

    }
    return {
        message: "product updated",
        data: {
            product
        }
    }
}

export const deleteProductService = async (id, data) => {
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
        throw new Error("product not found");

    }
    return {
        message: "product deleted",
        data: {
            product
        }
    }
}