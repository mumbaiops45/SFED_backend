import User from "../models/user.model.js";


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
