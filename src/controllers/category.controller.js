import { createCategoryService,getCategoryService ,updateCategoryService,deleteCategoryService} from "../services/category.service.js";

export const createCategoryController=async (req,res) => {
    let alldata = req.body;
    if (req.file) {
        alldata={...alldata,image:req.file.path, imagePublicId:req.file.filename}
    }
    const {message,data}=await createCategoryService(alldata);
    res.json({
        success:true,
        message,
        data
    })
}
export const getCategoryController=async (req,res) => {
    const {message,data}= await getCategoryService();
    res.json({
        success:true,
        message,
        data
    })
}

export const updateCategoryController=async (req,res) => {
    let allData=req.body;
   if (req.file) {
        allData={...allData,image:req.file.path, imagePublicId:req.file.filename}
    }
    const {message,data}= await updateCategoryService(req.params.id,allData);
    res.json({
        success:true,
        message,
        data
    })
}

export const deleteCategoryController=async (req,res) => {
    const {message,data}= await deleteCategoryService(req.params.id);
    res.json({
        success:true,
        message,
        data
    })
}