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

// desc to validate the Coupon code entered by the user
// route GET /api/coupons/validate
// access Protected
export const validateCoupon = async (req, res) => {
    try {
        const {couponcode} = req.body;
        const coupon = await couponModel.findOne({code: couponcode, userId: req.user._id, isActive: true});

        if(!coupon){
            return res.status(404).json({message: "Coupon not found"});
        }

        if(coupon.expirationDate < new Date()){
            coupon.isActive = false;
            await coupon.save();
            return res.status(404).json({message: "Coupon expired"});
        }

        res.json({
            message: "Coupon is valid",
            code: coupon.code,
            discountPercentage: coupon.discountPercentage,
        })
    } catch (error) {
        console.log("Error in validateCoupon Controller", error.message);
        res.status(500).json({message: "Server Error", error: error.message})
        
    }
}