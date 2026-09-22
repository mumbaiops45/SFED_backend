import { createProductMediaService,getProductMediaService,updateProductMediaByIdService,deleteProductMediaByIdService } from "../services/productMidia.Service.js";

export const createProductMediaController=async (req,res) => {
    let Alldata = req.body;
    if (req.file) {
        Alldata={...Alldata,url:req.file.path,publicId:req.file.filename}
    }
    const  {message,data}= await createProductMediaService(Alldata);
    res.json({
        success:true,
        message,
        data
    })
}

export const getProductMediaController=async (req,res) => {
    const {message,data}= await getProductMediaService(req.params.productId);
    res.json({
        success:true,
        message,
        data
    })
}

export const updateProductMediaByIdController=async (req,res) => {
let AllData=req.body;
 if (req.file) {
        AllData={...AllData,url:req.file.path,publicId:req.file.filename}
    }
    const {message,data}= await updateProductMediaByIdService(req.params.id,AllData);
    res.json({
        success:true,
        message,
        data
    })
}

export const deleteProductMediaByIdController =async (req,res) => {
    const{message,data}=await deleteProductMediaByIdService(req.params.id);
    res.json({
        success:true,
        message,
        data
    })
}