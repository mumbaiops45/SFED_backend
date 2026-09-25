import { creatOrderService,getOrderService ,updateOrderByCustomerService,updateOrderByAdminService} from "../services/order.service.js";

export const createOrdercontroller= async (req,res) => {
    const userId=req.user._id;
    const AddressId =req.body.AddressId;

    const {message,data}= await creatOrderService(userId,AddressId);

    res.json({
        success:true,
        message,
        data
    })
    
}
export const getOrdercontroller = async (req, res) => {
    const { page, limit, status, paymentStatus } = req.query;

    const { message, data } = await getOrderService(
        req.user._id,
        req.user.role,
        {
            page,
            limit,
            status,
            paymentStatus
        }
    );

    res.json({
        success: true,
        message,
        data
    });
};

export const updateOrderByCustomerController = async (req, res) => {
    const { orderId } = req.params;

    const status = "CANCELLED";

    const { message, data } =
        await updateOrderByCustomerService(orderId, status);

    res.json({
        success: true,
        message,
        data
    });
};


export const updateOrderByAdminController = async (req, res) => {
    const { orderId } = req.params;
    const { message, data } =
        await updateOrderByAdminService(orderId,req.body.status);

    res.json({
        success: true,
        message,
        data
    });
};