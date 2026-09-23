import User from "../models/user.model.js";

import { verifyToken } from "../utils/jwt.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.split(" ")[1]
            : null


        if (!token) {
            const error = new Error("Not authorized, no token supplied")
            error.status = 401;
            throw error;

        }

        const decode = verifyToken(token);
        if (decode.role === "admin") {
            const admin = await User.findById(decode._id);
            if (!admin) {
                throw new Error("user not found");
            }
            req.user = {
                _id:admin._id,
                name: admin.name,
                role: admin.role,
                email: admin.email
            }
            return next();
        }
        const user = await User.findById(decode._id)
        if (!user) {
            throw new Error("user not found");

        }
        if (user.isBlock) {
            throw new Error("Your account is blocked.");

        }
        req.user = user;
        next()
    } catch (error) {
        if (!error.status) {
            error.status = 401;
        }
        next(error)
    }
}

export const authorize =  (...allowedRoles) => {
    return  (req, res, next) => {
        try {
            if (!req.user) {
                throw new Error("not authenticated");

            }

            if (!allowedRoles.includes(req.user.role)) {
                const error = new Error("Access denied");
                error.status = 403;
                throw error;
            }
            next()
        } catch (error) {
            next(error);
        }
    }

}