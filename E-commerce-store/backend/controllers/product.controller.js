import productModel from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";


// @desc to get all Products
// @route GET /api/products/
// @access Private - Admin Only
export const getAllProducts = async (req, res) => {
    try {
        const Products = await productModel.find();
        res.json({Products})
    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({message: "Server error", error: error.message});
    }
    
}

// @desc to get Featured Products           
// @route GET /api/products/featured
// @access Public 
export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("freatured_products")
        if(featuredProducts){
            // JSON.parse() -> converts json string into JS object
            // Redis stores string not objects so we need to convert it
            return res.json(JSON.parse(featuredProducts));
        } 
        
        // if not in redis, fetch from mongodb
        // since find() (mongooese) sends mongo document insted of JS object
        // so we use .lean() so it retruns plan JS object insted of document, which faster good for performance
        featuredProducts = await productModel.find({isFeatured: true}).lean();

        if(!featuredProducts){
            res.json({message: "No Featured Products Found"})
        }

        await redis.set("freatured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Error in getFeaturedProducts controller", error.message);
        res.status(500).json({message: "Server Error", error: error.message});
        
    }
}

// @desc admin can create Products
// @route POST /api/products/
// access Private - Admin Only
export const createProduct = async (req, res) => {
    try {
        const {name, description, price, image, category} = req.body;

        let cloudinaryResponse = null;

        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(image, {folder: "products"});
        }

        const product = await productModel.create({
            name,
            description,
            price, 
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category,
        })

        res.status(201).json(product);
    } catch (error) {
        console.log("Error in createProduct controller");
        res.status(500).json({message: "Server Error", error: error.message})
        
    }
}

// @desc admin can delete Products 
// @route DELETE /api/products/:id
// @access Private - Admin Only
export const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);

        if(!product){
            res.status(404).json({message: "Product Not Found"})
        }

        if(product.image){
            const publicId = product.image.split('/').pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("Deleted Image from cloudinary");
            } catch (error) {
                console.log("Error deleting image from cloudinary");
            }
        }
        
        await productModel.findByIdAndDelete(req.params.id)
        res.json({message: "Product Deleted Successfully"})
    } catch (error) {
        console.log("Error in deleteProduct controller");
        res.status(500).json({message: `Server Error`, error: error.message})
        
    }
    
}

// @desc this is to get recommended products in cart/place order page
// @route GET /api/products/getRecommendedProducts
// access Public 
export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await productModel.aggregate([
            {
                $sample: {size:3}
            },
            {
                $project:{
                    _id:1,
                    name:1,
                    description:1,
                    image:1,
                    price:1,
                }
            }
        ])

        res.json(products);
    } catch (error) {
        console.log("Error in getRecommendedProducts controller");
        res.status(500).json({ message: "Server Error", error: error.message });
        
    }
}

// @desc this is get Products by catogery {eg. Shoes, Jeans, Shirt, etc}
// @path GET /api/products/catogery/:category
// access Public 
export const getProductsByCategory = async (req, res) => {
    try {
        const {category} = req.params;
        const products = await productModel.find({category});
        res.json(products);
    } catch (error) {
        console.log("Error in getProductsByCategory controller");
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

// @desc this is to toggle a product into featured to non-featured
// @route PATCH /api/products/:id
// @access Private - Admin Only
export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if(product){
            product.isFeatured = !product.isFeatured; // toggle
            const updatedProduct = await productModel.save(); // save to MongoDB

            await updatedFeaturedProductCache(); // update Redis cache
            res.json(updatedProduct); // 
        } else {
            res.status(404).json({message: "Product Not Found"});
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProduct controller");
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

async function updatedFeaturedProductCache(){
    try {
        const featuredProducts = await productModel.find({isFeatured: true}).lean();
        await redis.set("freatured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Error in updatedFeaturedProductCache function");
    }
}