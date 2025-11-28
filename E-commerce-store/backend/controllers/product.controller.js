import productModel from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";

// @desc to get all Products
// @path /api/products/getAllProducts
// @access protected /api/products/protectRoute/adminRoute
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
// @path /api/products/featured
// @access public 
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
// @path /api/products/createProduct
// access protected /api/products/protectRoute/adminRoute
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