import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getDashboardService = async () => {

    // Revenue
    const revenueResult = await Order.aggregate([
        {
            $match: {
                paymentStatus: "PAID"
            }
        },
        {
            $group: {
                _id: null,
                revenue: { $sum: "$total" }
            }
        }
    ]);

    const revenue = revenueResult[0]?.revenue || 0;


    // Top selling products
    const topSellingProducts = await Order.aggregate([
        {
            $match: {
                paymentStatus: "PAID"
            }
        },
        {
            $unwind: "$items"
        },
        {
            $group: {
                _id: "$items.product",
                name: { $first: "$items.name" },
                sku: { $first: "$items.sku" },
                quantity: { $sum: "$items.quantity" }
            }
        },
        {
            $sort: {
                quantity: -1
            }
        },
        {
            $limit: 10
        }
    ]);


    // Top customers
    const topCustomers = await Order.aggregate([
        {
            $match: {
                paymentStatus: "PAID"
            }
        },
        {
            $group: {
                _id: "$user",
                totalSpent: { $sum: "$total" },
                totalOrders: { $sum: 1 }
            }
        },
        {
            $sort: {
                totalSpent: -1
            }
        },
        {
            $limit: 10
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                _id: 1,
                name: "$user.name",
                email: "$user.email",
                totalSpent: 1,
                totalOrders: 1
            }
        }
    ]);


    // Low stock products
    const lowStockProducts = await Product.find({
        stock: { $lte: 10 },
        isActive: true
    })
        .select("name sku stock")
        .sort({ stock: 1 })
        .limit(10)
        .lean();


    // New users today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const newUsersToday = await User.countDocuments({
        role: "user",
        createdAt: {
            $gte: startOfToday,
            $lte: endOfToday
        }
    });


    // Total users
    const totalUsers = await User.countDocuments({
        role: "user"
    });


    // Total orders
    const totalOrders = await Order.countDocuments({
        paymentStatus: "PAID"
    });


    return {
        message: "Dashboard data fetched successfully",

        data: {
            revenue,
            totalOrders,
            totalUsers,
            newUsersToday,
            topSellingProducts,
            topCustomers,
            lowStockProducts
        }
    };
};