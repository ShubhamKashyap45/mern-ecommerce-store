import express from "express";
const router = express();

import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";


router.get('/', protectRoute, adminRoute, getAllProducts)
router.get('/freatured', getFeaturedProducts);
router.get('/recommendations', getRecommendedProducts);
router.post('/', protectRoute, adminRoute, createProduct);
router.delete('/:id',protectRoute, adminRoute, deleteProduct);


export default router;

