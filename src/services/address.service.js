import Address from "../models/address.model.js";

export const createAdressService=async (data) => {
    const address = await Address.create(data);
    return{
        message:"address created",
        data:{
            address
        }
    }
    
}

export const getAdressService=async (userId) => {
    const address = await Address.find({user:userId}).sort({isDefault:-1,createdAt:-1});

    return{
        message:"Addresses fetched successfully",
        data:{
            address
        }
    }
    
}

export const getAdressByIdService=async (id) => {
    const address = await Address.findById(id);

    return{
        message:"Addresses fetched successfully",
        data:{
            address
        }
    }
    
}

export const updateAdressByIdService=async (id,data) => {
    const address = await Address.findByIdAndUpdate(id,data,{new:true,runValidators:true});
    if (!address) {
        throw new Error("Address not found");
    };
    return{
        message:"address updated",
        data:{
            address
        }
    }
    
}


export const deleteAdressByIdService=async (id) => {
    const address = await Address.findByIdAndDelete(id);
    if (!address) {
        throw new Error("Address not found");
        
    }

    return{
        message:"Addresse deleted successfully",
        data:{
            address
        }
    }
    
}