import { motion } from "framer-motion";
import { useState } from 'react'
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {

    const [userInputCode, setUserInputCode] = useState("");
    const { coupon, isCouponApplied } = useCartStore();

    const handleApplyCoupon = () => {
        console.log(userInputCode);

    };

    const handleRemoveCoupon = async () => {
        console.log("remove coupon")
    };



    return (
        <motion.div
            className="space-y-6 border border-gray-200 bg-white p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {/* Input */}
            <div className="space-y-2">
                <label
                    htmlFor="voucher"
                    className="block text-xs font-medium uppercase tracking-wide text-gray-600"
                >
                    Voucher / Gift Card
                </label>

                <input
                    type="text"
                    id="voucher"
                    className="
                    w-full border border-gray-300 bg-transparent px-3 py-2 text-sm
                    text-black placeholder-gray-400
                    focus:border-black focus:outline-none
                "
                    placeholder="Enter code"
                    value={userInputCode}
                    onChange={(e) => setUserInputCode(e.target.value)}
                    required
                />
            </div>

            {/* Apply button */}
            <motion.button
                type="button"
                className="w-full border border-black bg-black py-2.5 text-sm font-medium tracking-wide
    text-white transition hover:bg-white hover:text-black"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleApplyCoupon}
            >
                APPLY CODE
            </motion.button>



            {/* Applied coupon */}
            {isCouponApplied && coupon && (
                <div className="space-y-2 border-t border-gray-200 pt-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                        Applied coupon
                    </p>

                    <p className="text-sm font-medium text-black">
                        {coupon.code} — {coupon.discountPercentage}% off
                    </p>

                    <motion.button
                        type="button"
                        className="
                        w-full border border-red-500 py-2 text-xs font-medium
                        text-red-500 transition
                        hover:bg-red-500 hover:text-white
                    "
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleRemoveCoupon}
                    >
                        REMOVE COUPON
                    </motion.button>
                </div>
            )}

            {/* Available coupon */}
            {coupon && !isCouponApplied && (
                <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                        Available coupon
                    </p>
                    <p className="mt-1 text-sm text-black">
                        {coupon.code} — {coupon.discountPercentage}% off
                    </p>
                </div>
            )}
        </motion.div>
    );

}

export default GiftCouponCard
