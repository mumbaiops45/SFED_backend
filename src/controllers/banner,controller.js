import { createBanneServicer,getBannerService,getBannerByIdService,updateBannerByIdService ,deleteBannerByIdService} from "../services/banner.service.js";

export const createBannerController=async (req,res) => {
    let allData=req.body;
    if (req.file) {
        allData={...allData,url:req.file.path,urlPublicId:req.file.filename}
    }

    
    const{message,data}= await createBanneServicer(allData);
    res.json({
        success:true,
        message,
        data
    })
}

export const getBannerController=async (req,res) => {
 
    const{message,data}= await getBannerService();
    res.json({
        success:true,
        message,
        data
    })
}

export const getBannerByIdController=async (req,res) => {
 const {id}= req.params;

    const{message,data}= await getBannerByIdService(id);
    res.json({
        success:true,
        message,
        data
    })
}

export const updateBannerByIdController=async (req,res) => {
 const {id}= req.params;
  let allData=req.body;

  
  
    if (req.file) {
        allData={...allData,url:req.file.path,urlPublicId:req.file.filename}
    }

    

    const{message,data}= await updateBannerByIdService(id,allData);
    res.json({
        success:true,
        message,
        data
    })
}


export const deleteBannerByIdController=async (req,res) => {
 const {id}= req.params;
  
    const{message,data}= await deleteBannerByIdService(id);
    res.json({
        success:true,
        message,
        data
    })
}

