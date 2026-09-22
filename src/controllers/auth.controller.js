
import { registerService,loginService } from "../services/auth.service.js";

export const registercontroller =async (req,res) => {
     const {data,message}= await registerService(req.body);
     res.json({
        success:true,
        message:message,
        data:data
     })
    
}

export const loginController =async (req,res) => {
   const { email, password }= req.body;
     const {message,data}= await loginService({ email, password });
     res.json({
        success:true,
        message:message,
        data:data
     })
    
}
