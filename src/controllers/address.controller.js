import { createAdressService,updateAdressByIdService ,getAdressService,getAdressByIdService,deleteAdressByIdService} from "../services/address.service.js";

export const createAdressController = async (req, res) => { 

    const userId = req.user._id;
       
    const bodyData = { ...req.body, user: userId }
 
    
    const { message, data } = await createAdressService(bodyData);
    res.json({
        success: true,
        message,
        data
    })
};
export const getAdressController = async (req, res) => { 

    const userId = req.user._id;

    const { message, data } = await getAdressService(userId);
    res.json({
        success: true,
        message,
        data
    })
};

export const getAdressByIdController = async (req, res) => { 

    const { message, data } = await getAdressByIdService(req.params.id);
    res.json({
        success: true,
        message,
        data
    })
};


export const updateAdressByIdController = async (req, res) => {     
    const { message, data } = await updateAdressByIdService(req.params.id,req.body);
    res.json({
        success: true,
        message,
        data
    })
};


export const deleteAdressByIdController = async (req, res) => {     
    const { message, data } = await deleteAdressByIdService(req.params.id);
    res.json({
        success: true,
        message,
        data
    })
}