import express from "express";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.middleware.js";
import cors from "cors";

import AuthRouter from "./routes/auth.route.js";
import UserRouter from "./routes/user.route.js";
import CategoryRouter from "./routes/category.route.js";
import ProductRouter from "./routes/product.route.js";
import ProductMediaRouter from "./routes/productMedia.route.js";



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



app.use(errorHandler);

export default app;



