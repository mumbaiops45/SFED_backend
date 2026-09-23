import { createCartService,getCartByUserService,getAllCartService,updateCartByproductIdSeervice,deleteCartByproductIdSeervice ,clearCartService} from "../services/cart.service.js";

export const createCartController=async (req,res) => {
    const{product}=req.body;
    const{message,data}= await createCartService(req.user._id,product);
    res.json({
        success:true,
        message,
        data
    })
}
export const getCartByUserController=async (req,res) => {
    const{message,data}= await getCartByUserService(req.user._id);
    res.json({
        success:true,
        message,
        data
    })
}

export const getAllCartController=async (req,res) => {
    const{message,data}= await getAllCartService();
    res.json({
        success:true,
        message,
        data
    })
}

export const updateCartByproductIdController=async (req,res) => {    
    const{message,data}= await updateCartByproductIdSeervice(req.user._id,req.params.productId,req.body.quantity);
    res.json({
        success:true,
        message,
        data
    })
}

export const deleteCartByproductIdController=async (req,res) => {    
    const{message,data}= await deleteCartByproductIdSeervice(req.user._id,req.params.productId);
    res.json({
        success:true,
        message,
        data
    })
}

export const clearCartController=async (req,res) => {    
    const{message,data}= await clearCartService(req.user._id);
    res.json({
        success:true,
        message,
        data
    })
}

