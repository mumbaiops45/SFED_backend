import { getUserService,updateUserService,updateUserByUserService ,getUserByIdService} from "../services/user.service.js";


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


// user access

export const updateUserByUserController =async (req,res) => {
    let allData= req.body;
    if (req.file) {
    allData={...allData,image:req.file.path,imagePublicId:req.file.filename}
    }
    const {name,phone,image,imagePublicId}=allData;
    const{message,data}= await updateUserByUserService(req.user._id,{name,phone,image,imagePublicId});
    res.json({
        message,
        data
    })
}

export const getUserByIdController =async (req,res) => {
   
    const{message,data}= await getUserByIdService(req.user._id);
    res.json({
        message,
        data
    })
}