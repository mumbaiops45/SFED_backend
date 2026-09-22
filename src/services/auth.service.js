import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genrateJwtToken } from "../utils/jwt.js";

export const registerService=async (data) => {
    const exist = await User.findOne({email:data.email});
    if (exist) {
        throw new Error("user already exist");
    }
    const hashed = await bcrypt.hash(data.password,10);

    const user=await User.create({
        name:data.name,
        email:data.email,
        phone:data.phone,
        password:hashed
    });

return{
    message:"Registration successful.",
    data:{
        user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
    }
    
}
}

export const loginService=async ({email,password}) => {
    if (!email || !password) {
        throw new Error("email and password is required to login");
    }
    const exist = await User.findOne({email:email}).select("_id role isBlock +password");
    if (!exist) {
        throw new Error("this email is not registered");
        
    }
    if (exist.isBlock) {
        throw new Error("Your account is blocked");
    }
    const match = await bcrypt.compare(password,exist.password)
if (!match) {
    throw new Error("password not match");
}
const token = genrateJwtToken({
    _id:exist._id,
    role:exist.role
})

return{
    message:"login successfull",
    data:{
        token
    }
}
}

