import productModel from "../models/product.model.js"

// @desc add items to cart
// route POST /api/cart/
// access Protected
export const addToCart = async (req, res) => {
    try {
        const {productId} = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find(item=>item.id === productId);
        if(existingItem){
            existingItem.quantity += 1;
        } else {
            user.cartItems.push(productId);
        }

        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        console.log("Error in addToCart controller", error.message);
        res.status(500).json({message: "Server error", error: error.message});
        
    }
}

// desc remove all items from the cart
// route DELETE /api/cart/
// access Protected
export const removeAllFromCart = async (req, res) => {
    try {
        const {productId} = req.body;
        const user = req.user;

        if(!productId){
            user.cartItems = [];

        } else {
            user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        }
        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        console.log("Error in reomoveAllFromCart controller", error.message);
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

// desc increase/decrease product quantity in cart
// route PUT /api/cart/:id
// access Protected
export const updateQuantity = async (req, res) => {
    try{
        const {id: productId} = req.params;
        const {quantity} = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find((item) => item.id === productId); 

        if(existingItem){
            if(quantity === 0){
                user.cartItems = user.cartItems.filter((item) => item.id !== productId);
                await user.save();
                return res.json(user.cartItems);
            }

            existingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
        } else {
             res.status(404).json({message: "Product not found"});
        }
    } catch (error){
        console.log("Error in updateQuantity contorller", error.message);
        res.status(500).json({message: "Server Error", error: error.message})
        
    }
}

// desc to get products in the cart
// route GET /api/cart/
// access Protected
export const getCartProducts = async (req, res) => {
    try{
        const products = productModel.find({_id: {$in: req.user.cartItems}});
        const cartItems = products.map((product) => {
            const item = req.user.cartItems.find((cartItems) => cartItems.id === product.id);
            return { ...product.toJson(), quantity: item.quantity };
        });

        res.json(cartItems);
    } catch (error){
        console.log("Error in getCartProducts controller", error.message);
        res.status(500).json({message: "Server error", error: error.message})
    }
}