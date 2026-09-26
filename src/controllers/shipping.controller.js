import { createShippingService,getShippinService ,updateShippinByIdService,deleteShippingByIdService} from "../services/shipping.service.js";

export const createShippingController =async (req,res) => {

    const { name, minOrderValue, maxOrderValue, shippingFee }=req.body;
    const{message,data}=await createShippingService({ name, minOrderValue, maxOrderValue, shippingFee });
    res.json({
        success:true,
        message,
        data
    })
}

export const getShippingController =async (req,res) => {

    const {page,limit }=req.query;
    const{message,data}=await getShippinService({page,limit });
    res.json({
        success:true,
        message,
        data
    })
}

export const updateShippingByIdController =async (req,res) => {
    const Id=req.params.id;
    const { name, minOrderValue, maxOrderValue, shippingFee }=req.body;
    const{message,data}=await updateShippinByIdService(Id,{ name, minOrderValue, maxOrderValue, shippingFee });
    res.json({
        success:true,
        message,
        data
    })
}

export const deleteShippingByIdController =async (req,res) => {
    const Id=req.params.id;
  
    const{message,data}=await deleteShippingByIdService(Id);
    res.json({
        success:true,
        message,
        data
    })
}
