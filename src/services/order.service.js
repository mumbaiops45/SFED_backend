import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import Address from "../models/address.model.js";
import Shipping from "../models/shipping.model.js";

export const creatOrderService = async (userId, AddressId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    };
    const productIds = cart.items.map(item => item.product);
    const products = await Product.find({
        _id: {
            $in: productIds
        }
    });

    const productMap = new Map();

    for (const product of products) {
        productMap.set(product._id.toString(), product);
    }


    const items = cart.items.map(item => {
        const product = productMap.get(item.product.toString());

        if (!product) {
            throw new Error(`Product not found: ${item.product}`);
        }
        return {
            product: item.product,
            quantity: item.quantity,
            sku: product.sku,
            name: product.name,
            price: product.price,
        }

    });

    const address = await Address.findOne({
        _id: AddressId,
        user: userId
    });
    if (!address) {
        throw new Error("Address not found");
    }
    const shippingAddress = {
        name: address.name,
        phone: address.phone,
        email: address.email,
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
        landmark: address.landmark
    };

    const subtotal = items.reduce((sum, item) => {
        return sum + item.price * item.quantity
    }, 0)

    const shipping= await Shipping.findOne({
        minOrderValue:{
            $lte:subtotal
        },
        $or:[{
            maxOrderValue:{
                $gte:subtotal
            }
        },{
            maxOrderValue:{
           $exists:false
            }
        }
    ]
    })


    const shippingFee = shipping.shippingFee;

    const total = subtotal + shippingFee;

    const order = await Order.create({
        user: userId,
        items: items,
        shippingAddress: shippingAddress,
        subTotal: subtotal,
        shippingFee: shippingFee,
        total: total
    });

    await Cart.deleteOne({
        _id: cart._id
    });

    return {
        message: "order created",
        data: {
            order
        }
    }



}

export const getOrderService = async (
    userId,
    role,
    { page = 1, limit = 10, status, paymentStatus }
) => {
    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    const filter = {};

    if (role === "user") {
        filter.user = userId;
    }

    if (status) {
        filter.status = status;
    }

    if (paymentStatus) {
        filter.paymentStatus = paymentStatus;
    }

    const orders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    return {
        message: "Orders fetched successfully",
        data: {
            orders
        }
    };
};

export const updateOrderByCustomerService = async (orderId, status = "CANCELLED") => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error("order not found");
    };
    const cancellableStatus = ["PENDING_PAYMENT", "CONFIRMED",]
    if (status === "CANCELLED") {

        if (!cancellableStatus.includes(order.status)) {
            throw new Error("Order cannot be cancelled at this stage");
        }

    } else {
        throw new Error("This status update is not allowed for customer");
    }
    order.status = status
    const order1 = await order.save()

    return {
        message: `order is cancelled`,
        data: {
            order1
        }
    }
}

export const updateOrderByAdminService = async (orderId, status) => {
    const order = await Order.findByIdAndUpdate(orderId,
        {
            status: status
        },
        {
            new: true,
            runValidators: true
        }
    )
    if (!order) {
        throw new Error("order not found");

    }

    return {
        message: `order is updated`,
        data: {
            order
        }
    }
}



