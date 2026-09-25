import express from "express";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.middleware.js";
import cors from "cors";

import AuthRouter from "./routes/auth.route.js";
import UserRouter from "./routes/user.route.js";
import CategoryRouter from "./routes/category.route.js";
import ProductRouter from "./routes/product.route.js";
import ProductMediaRouter from "./routes/productMedia.route.js";
import CartRouter from "./routes/cart.route.js";
import AddressRouter from "./routes/address.route.js";
import OrderRouter from "./routes/order.route.js";
import PaymentRouter from "./routes/payment.routes.js";



const app= express();
connectDB();
app.use(express.json());
app.use(cors({
    origin:true,
    credentials:true
}))

app.get("/",(req,res)=>{
    res.json({
        name:"arman",
        age:39
    })
})
app.use("/api/auth",AuthRouter);
app.use("/api/user",UserRouter);
app.use("/api/category",CategoryRouter);
app.use("/api/product",ProductRouter);
app.use("/api/productMedia",ProductMediaRouter);
app.use("/api/cart",CartRouter);
app.use("/api/address",AddressRouter);
app.use("/api/order",OrderRouter);
app.use("/api/payment",PaymentRouter);



app.use(errorHandler);

export default app;



