import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const createCartService = async (userId, productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("product not  found");
    }
    if (product.stock === 0) {
        throw new Error("this product is out of stock");
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        const cart = await Cart.create({
            user: userId,
            items: [
                {
                    product: productId,
                    quantity: 1
                }
            ]
        })
        return {
            message: "Add to cart successfully",
            data: {
                cart
            }
        }
    } else {
        const item = cart.items.find(item => item.product.toString() === productId);
        if (item) {
            if (item.quantity >= product.stock) {
                throw new Error("not enough stock available");
            }
            item.quantity += 1;
        } else {
            cart.items.push({
                product: productId,
                quantity: 1
            })
        }
        await cart.save();
    }
    return {
        message: "added to cart succefully",
        data: {
            cart
        }
    }

}
export const getCartByUserService = async (userId) => {
    const cart = await Cart.findOne({ user: userId });
    return {
        message: "User cart items",
        data: {
            cart
        }
    }
}
export const getAllCartService = async () => {
    const cart = await Cart.find().populate("items.product");;
    return {
        message: "cart items",
        data: {
            cart
        }
    }
}

export const updateCartByproductIdSeervice = async (userId, productId, quantity) => {


    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
        throw new Error("Cart not found");
    }
    const exist = cart.items.find(item => item.product._id.toString() === productId);
    if (!exist) {
        throw new Error("this product is not found in your cart");
    }
    if (quantity > 0 && exist.product.stock < exist.quantity + quantity) {
        throw new Error("This product does not have enough stock");
    }
    if (quantity < 0 && exist.quantity + quantity < 1) {
        throw new Error("Quantity cannot be less than 1");
    }
    const cart1 = await Cart.findOneAndUpdate(
        {
            user: userId,
            "items.product": productId
        },
        {
            $inc: {
                "items.$.quantity": quantity
            }
        },
        {
            new: true,
            runValidators: true
        }

    )
    return {
        message: "cart product quantity updated",
        data: {
            cart1
        }
    }



}

export const deleteCartByproductIdSeervice = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new Error("Cart not found");
    }
    const exist = cart.items.find(item => item.product.toString() === productId);
    if (!exist) {
        throw new Error("this product is not found in your cart");
    }

    const cart1 = await Cart.findOneAndUpdate({
        user: userId,
    },
        {
            $pull: {
                items: {
                    product: productId
                }
            }
        },
        {
            new: true
        }
    )
    return {
        message: "product deleted from your cart",
        data: {
            cart1
        }
    }

}

export const clearCartService = async (userId) => {
    const cart = await Cart.findOneAndDelete({ user: userId });
    if (!cart) {
        throw new Error("cart not found");
    }
    return {
        message: "user cart clear",
        data: {
            cart
        }
    }
}