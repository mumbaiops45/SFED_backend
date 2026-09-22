import { updateUserService } from "../services/user.service.js";

export const updateUserController =async (req,res) => {
    const{message,data}= await updateUserService(req.params.id,req.body);
    res.json({
        message,
        data
    })
}