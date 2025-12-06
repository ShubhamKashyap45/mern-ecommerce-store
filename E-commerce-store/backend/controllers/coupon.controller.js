import couponModel from "../models/coupon.model.js"

// @desc to get coupon from the coupon collections
// route GET /api/coupons/
// access Protected
export const getCoupon = async (req, res) => {
    try {
        const coupon = await couponModel.findOne({userId:req.user._id, isActive: true});
        res.json(coupon || null);
    } catch (error) {
        console.log("Error in getCoupon controller", error.message);
        res.status(500).json({message: "Server Error", error: error.message});
    }
}