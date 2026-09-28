import { getDashboardService } from "../services/dashbord.service.js";

export const getDashboardController =async (req,res) => {
    const {message,data}= await getDashboardService();

    res.json({
        success:true,
        message,
        data
    })
}