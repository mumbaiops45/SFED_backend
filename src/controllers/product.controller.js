import { createProductService,getProductService,updateProductService,deleteProductService } from "../services/product.service.js";

export const createProductController =async (req,res) => {
    const{message,data}=await createProductService(req.body);
    res.json({
        success:true,
        message,
        data
    })
}

export const getProductController =async (req,res) => {
    const{page,limit,price}= req.query;
    const{message,data}=await getProductService({page,limit,price});
    res.json({
        success:true,
        message,
        data
    })
}

export const updateProductController =async (req,res) => {
    const{message,data}=await updateProductService(req.params.id,req.body);
    res.json({
        success:true,
        message,
        data
    })
}

export const deleteProductController =async (req,res) => {
    const{message,data}=await deleteProductService(req.params.id);
    res.json({
        success:true,
        message,
        data
    })
}