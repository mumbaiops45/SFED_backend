import { getUserService,updateUserService } from "../services/user.service.js";


export const getUserController = async (req, res) => {
    const { message, data } = await getUserService();

    res.json({
        success: true,
        message,
        data
    });
};
export const updateUserController =async (req,res) => {
    const{message,data}= await updateUserService(req.params.id,req.body);
    res.json({
        message,
        data
    })
}