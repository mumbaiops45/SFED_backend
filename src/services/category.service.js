import Category from "../models/category.model.js";
import cloudinary from "../config/cloudinary.js";

export const createCategoryService =async (data) => {
    const category= await Category.create(data);
    return{
        message:"Category created",
        data:{
            category
        }

    }
}
export const getCategoryService=async () => {
    const category = await Category.find().lean()
    return{
        message:"All category",
        data:{
            category
        }
    }
}
export const updateCategoryService=async (id,data) => {

    const oldCategory=await Category.findById(id)
      if (!oldCategory) {
        throw new Error("category not found");
        
    }
    const oldImagePublicId=oldCategory.imagePublicId;
    const category = await Category.findByIdAndUpdate(id,data,{
        new:true,
        runValidators:true
    })
    if (data.image && oldImagePublicId) {
        await cloudinary.uploader.destroy(oldImagePublicId);

    }
    return{
        message:"category updated",
        data:{
            category
        }
    }
}
export const deleteCategoryService=async (id) => {

    const oldCategory=await Category.findById(id)
      if (!oldCategory) {
        throw new Error("category not found");
        
    }
    const oldImagePublicId=oldCategory.imagePublicId;
    const category = await Category.findByIdAndDelete(id);
    if (oldImagePublicId) {
        await cloudinary.uploader.destroy(oldImagePublicId);

    }
    return{
        message:"category deleted",
        data:{
            category
        }
    }
}



