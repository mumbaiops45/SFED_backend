import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

// admin

export const getUserService=async () => {
    const user = await User.find({role:"user"});
      return {
        message: "Users fetched successfully",
        data: {
            user
        }
    };
}


export const updateUserService = async (id, data) => {

    if (data.password) {
        throw new Error("password not be change");

    }
    const user = await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    })
    if (!user) {
        throw new Error("user not found");
    }
    return {
        message: `successfully updated the user:${user.name}`,
        data: {
            user
        }
    }

}


// user access

export const updateUserByUserService = async (userId,{name,phone,image}) => {

  const exist = await User.findById(userId);
  if (!exist) {
    throw new Error("user not found");
  };

  const oldImagePublicId=exist.imagePublicId;
  const user= await User.findByIdAndUpdate(userId,{name,phone,image})

  if (image && oldImagePublicId) {
        await cloudinary.uploader.destroy(oldImagePublicId);
    }
    return {
        message: `successfully updated the user:${user.name}`,
        data: {
            user
        }
    }

}

export const getUserByIdService=async (Id) => {
    const user = await User.findById(Id);

       return {
        message: `successfully fetch the user:${user.name}`,
        data: {
            user
        }
    }
}